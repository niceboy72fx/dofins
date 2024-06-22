import { useSnackbar } from "notistack";
import RequestUtil from "../../../service/helper/requestUtil";
import { urlMap } from "../../../service/urls";
import { useEffect, useState } from "react";
import GrowthTargetUI from "./indexUI";

const GrowthTarget = ({ dofins }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { prefix, endpoints } = urlMap.stock;
  const [params, setParams] = useState({
    pageNumber: 1,
    itemPerPage: 12,
    d1Limit: 7,
    financeLimit: 1,
  });

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [industries, setIndustries] = useState("");
  const handleApiAllStockMarket = () => {
    if (dofins) {
      RequestUtil.requestWithoutToken(
        prefix +
        endpoints.shortList +
        `?${industries === "" ? "" : `industries=${industries}`
        }&page_number=${params.pageNumber}&items_per_page=${params.itemPerPage
        }&d1_limit=${params.d1Limit}&finance_limit=${params.financeLimit}`,
        "GET"
      )
        .then((req) => {
          setData(req?.data);
          setLoader(false);
        })
        .catch((error) => enqueueSnackbar(error, "error"));
    } else {
      RequestUtil.requestWithoutToken(
        prefix +
        endpoints.display +
        `?page_number=${params.pageNumber}&items_per_page=${params.itemPerPage}&d1_limit=
        ${params.d1Limit}&finance_limit=${params.financeLimit}`,
        "GET"
      )
        .then((req) => {
          setData(req?.data);
          setLoader(false);
        })
        .catch((error) => enqueueSnackbar(error, "error"));
    }
  };
  useEffect(() => {
    handleApiAllStockMarket();
  }, [params, dofins, industries]);

  return (
    <div className="">
      <GrowthTargetUI
        data={data}
        setParams={setParams}
        loader={loader}
        dofins={dofins}
        setIndustries={setIndustries}
        industries={industries} />
    </div>
  );
};

export default GrowthTarget;

//  shadow-[0_10px_100px] rounded-sm w-full  shadow-blue-400