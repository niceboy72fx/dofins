import {
  Gauge,
  PieChart,
  gaugeClasses,
  pieArcLabelClasses,
} from "@mui/x-charts";

import Util from "../../../service/helper/util";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const StockInfor = ({ dataStock }) => {
  const row = [
    { key: "Symbol", value: dataStock.symbol },
    { key: "Exchange", value: dataStock.exchange },
    { key: "Company", value: dataStock.company },
    { key: "Industry", value: dataStock.industry },
    { key: "Risk Group", value: dataStock.risk_group },
    { key: "Stock Size", value: dataStock.stock_size },
    { key: "Priority Level", value: dataStock.priority_level },
    {
      key: "Marketcap",
      value: Util.formatNumber(dataStock.finance_records[0].market_cap).replace(
        "₫",
        "VND"
      ),
    },
    {
      key: "Free Shares",
      value: Util.formatNumber(
        dataStock?.finance_records[0].free_shares
      ).replace("₫", ""),
    },
    {
      key: "Shares Out Standing",
      value: Util.formatNumber(
        dataStock?.finance_records[0].shares_out_standing
      ).replace("₫", ""),
    },
  ];
  const freeShare =
    (dataStock.finance_records[0].free_shares /
      dataStock.finance_records[0].shares_out_standing) *
    100;
  const data = [
    {
      id: 0,
      value: dataStock?.finance_records[0].free_shares,
      label: `Free Shares: ${freeShare.toFixed(2)}%`,
      color: "#a6d854",
    },
    {
      id: 1,
      value: dataStock?.finance_records[0].shares_out_standing,
      label: "Shares Out Standing: 100%",
      color: "#8da0cb",
    },
  ];

  return (
    <div className=" bg-slate-900 p-5 mx-5">
      <div style={{ fontSize: "1.2rem" }} className="font-bold text-white ">
        {dataStock.symbol} - {dataStock.company}
      </div>
      <div className=" bg-slate-900 p-3  flex flex-row my-2 items-center justify-center ">
        <div className=" round-xl shadow-2xl p-5 mx-5 shadow-blue-950">
          <div className=" px-10 mx-10 my-5 flex flex-row items-center justify-center">
            <div
              style={{ fontSize: "2.2rem" }}
              className="text-white font-bold m-2"
            >
              {Util.formatNumber(
                dataStock.exchange === "UPCOM"
                  ? dataStock.d1_records[0].average
                  : dataStock.d1_records[0].close
              ).replace("₫", "VND")}
            </div>
            {/* <div className="text-red-600 font-bold m-2 text-3xl ">
              <SouthIcon />
            </div> */}
          </div>
          <div className="px-7">
            <div className="font-bold text-white ">
              {row.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-centerpy-3 my-2 text-sm"
                >
                  <div>{item.key} :</div>
                  <div className=" ml-3 ">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" text-white  ">
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <Gauge
                value={freeShare}
                startAngle={0}
                endAngle={360}
                innerRadius="0%"
                outerRadius="100%"
                width={300}
                height={350}
                sx={{
                  [`tspan`]: {
                    display: "none",
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#a6d854  ",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#8da0cb",
                  },
                }}
              />
            </div>
            <div>
              {data.map((item) => {
                return (
                  <div className="flex items-center justify-start text-sm  mx-4">
                    <p
                      style={{ backgroundColor: item.color }}
                      className=" p-1.5"
                    ></p>
                    <p className="mx-3">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInfor;
