import * as React from "react";
import SearchUI from "./componentUI/search";
import ChartUI from "./componentUI/chartUI";
import BushBarChartUI from "./componentUI/bushBarChartUI";
import SimpleBarChart from "./componentUI/simpleBarChart";
import LineAndBarChart from "./componentUI/lineAndBarChart";
import StockMarketChart from "./componentUI/stockMarketChart";
import StockMarketChartTest from "./componentUI/stockMarketChartTest";

export default function GrowthTargetUI({
  data,
  setParams,
  loader,
  dofins,
  setIndustries,
  industries
}) {
  return (
    <div>
      <div className=" shadow-[0_10px_100px] rounded-sm w-full  shadow-blue-400 py-4 rounded-md my-3">
        {dofins ? (
          <SearchUI industries={setIndustries} />
        ) : null}
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            {/* <SimpleBarChart /> */}
          </div>
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <LineAndBarChart />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <SimpleBarChart />
          </div>
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <SimpleBarChart />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <ChartUI />
          </div>
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <ChartUI />
          </div>
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <ChartUI />
          </div>
          <div className="shadow-[0_10px_100px] rounded-sm w-full   shadow-blue-400 py-4 rounded-md my-3">
            <ChartUI />
          </div>
        </div>
        <div className="shadow-[0_10px_100px] rounded-sm w-full  shadow-blue-400 py-4 rounded-md my-3" >
          <BushBarChartUI />
        </div>
        {/* <div className="shadow-[0_10px_100px] rounded-sm w-full  shadow-blue-400 py-4 rounded-md my-3" >
          <StockMarketChart />
        </div> */}
        <div className="shadow-[0_10px_100px] rounded-sm w-full  shadow-blue-400 py-4 rounded-md my-3" >
          <StockMarketChartTest />
        </div>
      </div>
    </div>
  );
}
