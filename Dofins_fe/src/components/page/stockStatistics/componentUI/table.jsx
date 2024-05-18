import * as React from "react";
import { ConfigProvider, Spin, Table } from "antd";
import styled from "styled-components";
import { Button } from "@mui/material";
import { popUp } from "../../../../state";
import { useRecoilState, useSetRecoilState } from "recoil";
import Util from "../../../../service/helper/util";

const TableStyled = styled(Table)`
  margin-top: 15px;
  .ant-table-column-has-sorters {
    word-break: break-word;
  }
  .ant-table-cell {
    background-color: #101726;
    color: white;
    text-align: center;
  }
  .ant-table-cell-row-hover {
    background-color: #101726;
    color: white;
  }
  .ant-table-thead > tr > th {
    background-color: #1d283a; // Set background color for the header cells
    color: #ffffff; // Set text color for the header cells
    text-align: center;
  }
  .ant-table-tbody > tr:hover {
    background-color: unset; // Remove hover effect on table rows
  }
  tbody.ant-table-tbody {
    .ant-table-row:hover {
      background-color: unset !important; // Remove hover effect on table rows
    }
  }
  .ant-pagination-item {
    color: white;
    background-color: #101726;
  }
  .ant-pagination-item-link {
    color: white;
    background-color: #101726;
  }
  .ant-select-selector {
    color: white;
    background-color: #101726;
  }

  .ant-pagination .ant-pagination-item a {
    color: white;
  }
  .ant-table-cell-fix-right-first {
    background-color: #1d283a;
    color: white;
  }
  .ant-pagination-options {
    display: none;
  }
  .ant-table-body {
    scrollbar-width: auto;
    scrollbar-color: auto;
  }

  // custom scrollbar
  .ant-table-body::-webkit-scrollbar {
    width: 3px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    background-color: #000000;
    height: 1px;
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    background-color: gray;
  }
  .ant-table-body::-webkit-scrollbar {
    background-color: gray;
    height: 8px;
  }
  .ant-table-cell-fix-left-last {
    background-color: #1d283a;
    color: white;
    font-weight: 900;
    font-size: 17px;
  }
`;

export default function TableUI({ stockData, setParams, loader }) {
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredMessages, setFilteredMessages] = React.useState([]);

  const setPopUp = useSetRecoilState(popUp);

  const [stock, setStock] = React.useState({
    items: [],
    totalItems: 0,
    totalPages: 0,
    itemsPerPage: 0,
    page: 0,
  });
  const [dateTime, setDateTime] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [listStock, setListStock] = React.useState([]);
  const [listHistoryStock, setListHistoryStock] = React.useState([]);

  const getStockHistory = () => {
    getToken();
    let promises = stockData?.items?.map((item) =>
      Util.fetchHistoricalStock(item.symbol, token)
    );
    Promise.all(promises)
      .then((data) => {
        if (data.length > 0) {
          const binding = data
            .filter((result) => result !== undefined && result.length > 0)
            .flat();
          setListHistoryStock(binding);
        } else {
          setListHistoryStock([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching stock history:", error);
      });
  };

  React.useEffect(() => {
    const { items, total_pages, total_items, items_per_page, page } = stockData;
    if (items && Array.isArray(items)) {
      setLoading(false);
      setStock({
        items: items,
        totalItems: total_items,
        totalPages: total_pages,
        itemsPerPage: items_per_page,
        page: page,
      });
      const dateRefractor = stockData.items.map((record) => record.d1_records);
      if (dateRefractor.length > 0) {
        const temp = dateRefractor[0]?.map((record, index) => {
          return {
            title: record.date,
            dataIndex: record.date,
            key: `${record.date}_${index}`,
          };
        });
        setDateTime(temp.reverse());
      }
    }
    getStockHistory();
  }, [stockData]);

  const getToken = async () => {
    const token = await Util.authenticate();
    setToken(token);
  };

  React.useEffect(() => {
    const realtime = Util.handleStockRealtime(setFilteredMessages);
    return () => {
      realtime();
    };
  }, []);

  /////////////////////////////////////////
  let previousPriceAverages = {};
  React.useEffect(() => {
    const stockTest = stock.items.map((record) => {
      let priceAverageRecord = null;

      const stockRealtime =
        filteredMessages.length > 0
          ? filteredMessages.find((item) => item.Symbol === record.symbol)
          : undefined;

      let stockHistory = [];
      if (listHistoryStock.length > 0) {
        stockHistory = listHistoryStock.find(
          (item) => item?.Symbol === record.symbol
        );
      }

      if (stockHistory) {
        stockHistory = {
          ...stockHistory,
          exchange: record.exchange,
        };
      }

      let priceAverage = stockRealtime
        ? record.exchange == "UPCOM"
          ? stockRealtime.PriceAverage
          : stockRealtime.PriceClose
        : "N/A";
      if (priceAverageRecord !== null) {
        previousPriceAverages[record.symbol] = priceAverageRecord;
      }
      if (priceAverage === "N/A" && previousPriceAverages[record.symbol]) {
        priceAverage = previousPriceAverages[record.symbol];
      }

      const obj = {
        name: record.symbol,
        today:
          priceAverage === "N/A"
            ? listHistoryStock.length < 0
              ? "Market's closed"
              : Util.formatNumber(
                  stockHistory.exchange !== "UPCOM"
                    ? stockHistory.PriceClose
                    : stockHistory.PriceAverage
                )
            : priceAverage,
        action: (
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              setPopUp({
                open: true,
                data: listHistoryStock ? record : listHistoryStock,
              });
            }}
          >
            Detail
          </Button>
        ),
      };
      record.d1_records.forEach((item) => {
        obj[item.date] = Util.formatNumber(
          record.exchange == "UPCOM" ? item.average : item.close
        );
      });
      return obj;
    });
    setListStock(stockTest);
  }, [listHistoryStock]);

  const now = new Date();

  // Extract year, month, and day
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Combine into the desired format
  const formattedDate = `${year}-${month}-${day}`;

  const columns = [
    {
      title: "Tickers",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    ...dateTime,
    {
      title: formattedDate,
      dataIndex: "today",
      key: "today",
      fixed: "right",
    },
    {
      title: "Action",
      key: "operation",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const data = [...listStock];

  const handleTableChange = (pagination) => {
    setParams({
      pageNumber: pagination.current,
      itemPerPage: 12,
      d1Limit: 7,
      financeLimit: 1,
    });
    setCurrentPage(pagination.current);
  };

  return (
    <TableStyled
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 690,
      }}
      rowHoverable={false}
      loading={{
        indicator: (
          <div>
            <Spin />
          </div>
        ),
        spinning: loading,
      }}
      pagination={{
        current: currentPage,
        total: stock.totalItems,
        pageSize: stock.itemsPerPage,
      }}
      size="small"
      onChange={handleTableChange}
    />
  );
}
