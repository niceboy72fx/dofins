import aiohttp
import asyncio
import json
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import select, update
from models import Tickers, Finances, D1
from common.db import ScopedSession
from loguru import logger
from datetime import datetime
import json

jwt_token = ""
urls = "https://www.fireant.vn/api"



class UpdateData():
    def datetime_to_date(self,datetime_str):
        try:
            if datetime_str is not None:
                datetime_obj = datetime.fromisoformat(datetime_str)
                date_str = datetime_obj.date()
                formatted_date_str = date_str.isoformat()
                return formatted_date_str
            else:
                return None
        except ValueError:
            # Handle invalid datetime string
            return None


    async def authenticate(self):
        headers = {"Content-Type": "application/json"}

        body = {"email": "dolphindofin@gmail.com", "password": "Nvtrung@81"}
        async with aiohttp.ClientSession() as session:
            async with session.post(
                urls + "/Data/Login/Login", json=body, headers=headers
            ) as response:
                global jwt_token
                respone_data = await response.json()
                jwt_token = respone_data.get("Token")


    async def get_intraday_quotes(self,symbol: str):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/IntradayQuotes/" + symbol, headers=headers
            ) as response:
                respone_data = await response.json()
                print(respone_data)


    async def get_stock_exchange(self,symbol: str):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/SymbolInfo/" + symbol + "/" + "vi-vn", headers=headers
            ) as response:
                respone_data = await response.json()
                print(respone_data)
                print(len(respone_data))


    async def get_all_stock_exchange(self):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/Symbols/" + "vi-vn", headers=headers
            ) as response:
                respone_data = await response.json()
                self.mapping_exchange(respone_data)


    def mapping_financial(self,raw_data):
        symbol_info_list = []
        for data in raw_data:
            date = self.datetime_to_date(data.get("Date", None))
            if date is None:
                continue
            FreeShares = data.get("FreeShares", None)
            if FreeShares is None:
                FreeShares = data.get("SharesOutstanding", None)
            if (
                data.get("SharesOutstanding", None) is None
                or data.get("MarketCapitalization", None) is None
            ):
                continue
            symbol_info_list.append(
                {
                    "symbol": data.get("Symbol"),
                    "date": date,
                    "shares_out_standing": data.get("SharesOutstanding", None),
                    "free_shares": FreeShares,
                    "market_cap": data.get("MarketCapitalization", None),
                }
            )

        with ScopedSession() as session:
            self.save_finance(Tickers, Finances, session, symbol_info_list)


    def save_finance(self,parrent_model, model, session, values_to_insert):

        for item in values_to_insert:
            symbol = item.get("symbol")
            ticker = session.query(parrent_model).filter_by(symbol=symbol).first()
            if ticker is None:

                print(f"Symbol '{symbol}' does not exist in the tickers table.")
                continue
            stmt = insert(model).values(**item)
            stmt = stmt.on_conflict_do_update(
                index_elements=["symbol", "date"],
                set_={
                    "symbol": stmt.excluded.symbol,
                    "date": stmt.excluded.date,
                    "shares_out_standing": stmt.excluded.shares_out_standing,
                    "free_shares": stmt.excluded.free_shares,
                    "market_cap": stmt.excluded.market_cap,
                },
            )
            session.execute(stmt)
            logger.info(item["symbol"])


    async def allLastest_financialinfo(self):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Finance/AllLastestFinancialInfo/", headers=headers
            ) as response:
                respone_data = await response.json()
                self.mapping_financial(respone_data)


    def mapping_exchange(self,raw_data):
        symbol_info_list = []
        convert = {"HOSTC": "HSX", "HASTC": "HNX", "UPCOM": "UPCOM"}
        for data in raw_data:
            symbol_info_list.append(
                {
                    "symbol": data.get("<Symbol>k__BackingField", None),
                    "company": data.get("<Name>k__BackingField", None),
                    "exchange": convert[data.get("<Exchange>k__BackingField", None)],
                }
            )

        with ScopedSession() as session:
            self.save_2_db(Tickers, session, symbol_info_list)


    async def get_all_stock_exchange(self):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/Symbols/" + "vi-vn", headers=headers
            ) as response:
                respone_data = await response.json()
                self.mapping_exchange(respone_data)


    async def history_price(self,symbol):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls
                + "/Excel/Company/HistoricalQuotes/"
                + symbol
                + "/"
                + "2024-05-17"
                + "/"
                + "2024-05-17",
                headers=headers,
            ) as response:
                respone_data = await response.json()
                self.mapping_history(respone_data)
                logger.info(symbol)


    async def crawl_data(self):
        with ScopedSession() as session:
            stmt = select(Tickers.symbol)
            symbols = list(session.execute(stmt).scalars())
        for symbol in symbols:
            await self.history_price(symbol)


    def mapping_history(self,raw_data):
        price_data_list = []
        for data in raw_data:
            date = self.datetime_to_date(data.get("Date"))
            price_data_list.append(
                {
                    "date": date,
                    "symbol": data.get("Symbol"),
                    "open": data.get("PriceOpen"),
                    "close": data.get("PriceClose"),
                    "high": data.get("PriceHigh"),
                    "low": data.get("PriceLow"),
                    "average": data.get("PriceAverage"),
                    "volume": data.get("Volume"),
                }
            )

        with ScopedSession() as session:
            self.save_2_D1(D1, session, price_data_list)


    def save_2_D1(self,model, session, values_to_insert):
        for item in values_to_insert:
            stmt = insert(model).values(**item)
            stmt = stmt.on_conflict_do_update(
                index_elements=["symbol", "date"],
                set_={
                    "open": stmt.excluded.open,
                    "high": stmt.excluded.high,
                    "low": stmt.excluded.low,
                    "close": stmt.excluded.close,
                    "average": stmt.excluded.average,
                    "volume": stmt.excluded.volume,
                    "date": stmt.excluded.date,
                },
            )
            session.execute(stmt)


    async def current_price(self,symbol):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/IntradayQuotes/" + symbol, headers=headers
            ) as response:
                respone_data = await response.json()
                with open("current_price.json", "w", encoding="utf-8") as json_file:
                    json.dump(respone_data, json_file, ensure_ascii=False, indent=4)


    async def current_price_all_market(self):
        headers = {"JWTToken": jwt_token}
        async with aiohttp.ClientSession() as session:
            async with session.get(
                urls + "/Excel/Market/HistoricalQuotes/", headers=headers
            ) as response:
                respone_data = await response.json()
                with open("current_price_mk.json", "w", encoding="utf-8") as json_file:
                    json.dump(respone_data, json_file, ensure_ascii=False, indent=4)


    def save_2_db(self,model, session, values_to_insert):

        for item in values_to_insert:
            stmt = insert(model).values(**item)
            stmt = stmt.on_conflict_do_update(
                index_elements=["symbol"],
                set_={
                    "exchange": stmt.excluded.exchange,
                    "company": stmt.excluded.company,
                },
            )
            session.execute(stmt)


    def update_db(self,model, session, values_to_update):
        for item in values_to_update:
            stmt = (
                update(model)
                .where(model.symbol == item["symbol"])
                .values(
                    industry=item["industry"],
                    risk_group=item["risk_group"],
                    stock_size=item["stock_size"],
                    priority_level=item["priority_level"],
                    adjustment_coefficient=item["adjustment_coefficient"],
                    dofin_selected=True,
                )
            )
            session.execute(stmt)
        session.commit()


    def json_to_list_of_dicts(self,file_path):
        try:
            # Open the JSON file
            with open(file_path, "r") as file:
                # Load JSON data
                data = json.load(file)

            # Check if the data is already a list of dictionaries
            if isinstance(data, list):
                return data
            else:
                # If not, wrap it in a list
                return [data]

        except FileNotFoundError:
            print(f"The file {file_path} does not exist.")
        except json.JSONDecodeError:
            print("Error decoding JSON from the file.")
        except Exception as e:
            print(f"An error occurred: {e}")


    async def import_manual_data(self):
        symbol_info_list = self.json_to_list_of_dicts("manual_data.json")
        with ScopedSession() as session:
            self.update_db(Tickers, session, symbol_info_list)


    def update_all_data(self):
        asyncio.run(self.authenticate())
        asyncio.run(self.allLastest_financialinfo())
        asyncio.run(self.crawl_data())
        asyncio.run(self.import_manual_data())



update_data = UpdateData()