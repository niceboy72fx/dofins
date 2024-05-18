from models import Tickers
from typing import List, Dict
from sqlalchemy.orm import Session
from sqlalchemy import asc


class Display:
    def get_all_market(
        self, db: Session, page_number=1, items_per_page=15, d1_limit=7, finance_limit=1
    ) -> Dict:
        start_index = (page_number - 1) * items_per_page
        with db as session:
            query = session.query(Tickers)
        total_items = query.count()
        results = query.offset(start_index).limit(items_per_page).all()

        total_pages = (total_items + items_per_page - 1) // items_per_page

        for result in results:
            result.d1_records = result.d1_records[:d1_limit]
            result.finance_records = result.finance_records[:finance_limit]

        return {
            "page": page_number,
            "items_per_page": items_per_page,
            "total_items": total_items,
            "total_pages": total_pages,
            "items": results,
        }

    def get_dofin_selected(
        self,
        db: Session,
        page_number=1,
        items_per_page=15,
        d1_limit=7,
        finance_limit=1,
        industry=None,
    ) -> Dict:
        start_index = (page_number - 1) * items_per_page
        with db as session:
            if industry is None:
                query = (
                    session.query(Tickers)
                    .filter(Tickers.dofin_selected == True)
                    .order_by(asc(Tickers.industry))
                )
            else:
                query = session.query(Tickers).filter(
                    Tickers.dofin_selected == True, Tickers.industry == industry
                )
        total_items = query.count()
        results = query.offset(start_index).limit(items_per_page).all()

        total_pages = (total_items + items_per_page - 1) // items_per_page

        for result in results:
            result.d1_records = result.d1_records[:d1_limit]
            result.finance_records = result.finance_records[:finance_limit]

        return {
            "page": page_number,
            "items_per_page": items_per_page,
            "total_items": total_items,
            "total_pages": total_pages,
            "items": results,
        }


display = Display()
