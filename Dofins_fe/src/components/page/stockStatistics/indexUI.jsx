import * as React from "react";
import SearchUI from "./componentUI/search";
import TableUI from "./componentUI/table";

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
      {dofins ? (
        <div>
          <SearchUI industries={setIndustries} />
        </div>
      ) : null}
      <TableUI stockData={data} setParams={setParams} loader={loader} industries={industries} />
    </div>
  );
}
