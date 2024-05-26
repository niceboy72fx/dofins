import * as React from "react";
import TableUI from "./componentUI/table";
import SearchUI from "./componentUI/search";

export default function StockStatisticsUI({
  data,
  setParams,
  loader,
  dofins,
  setIndustries,
  industries
}) {
  return (
    <div>
      {dofins ? (
        <div>
          <SearchUI industries={setIndustries}/>
        </div>
      ) : null}
      <TableUI stockData={data} setParams={setParams} loader={loader} industries={industries}  />
    </div>
  );
}
