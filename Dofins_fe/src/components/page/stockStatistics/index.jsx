import { useSnackbar } from "notistack";
import StockStatisticsUI from "./indexUI";
import RequestUtil from "../../../service/helper/requestUtil";
import { urlMap } from "../../../service/urls";
import { useEffect, useState } from "react";

const StockStatistics = ({ dofins }) => {
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
          `?${
            industries === "" ? "" : `industries=${industries}`
          }&page_number=${params.pageNumber}&items_per_page=${
            params.itemPerPage
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
          `?page_number=${params.pageNumber}&items_per_page=${params.itemPerPage}&d1_limit=${params.d1Limit}&finance_limit=${params.financeLimit}`,
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
    <div className=" p-3 shadow-2xl rounded-lg w-full  shadow-blue-500">
      <StockStatisticsUI
        data={data}
        setParams={setParams}
        loader={loader}
        dofins={dofins}
        industries={setIndustries}
      />
    </div>
  );
};

export default StockStatistics;
