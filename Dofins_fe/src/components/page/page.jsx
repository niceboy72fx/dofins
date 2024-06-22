import AssignmentIcon from "@mui/icons-material/Assignment";
import Test from "./test";
import DashBoard from "./dashBoard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StockStatistics from "./stockStatistics";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GrowthTarget from "./growthTarget";

const color = {
  color: "white",
};

export const pageCms = [
  {
    path: "",
    element: <StockStatistics dofins={false} />,
    name: "All Markets",
    children: [
      {
        icon: <AssignmentIcon sx={color} />,
        path: "",
        element: <Test />,
        name: "All Markets",
      },
    ],
  },
  {
    path: "/shorts-list",
    element: <StockStatistics dofins={true} />,
    name: "Dofin's Short List",
    children: [
      {
        icon: <AssignmentIcon sx={color} />,
        path: "",
        element: <Test />,
        name: "Dofin's Short List",
      },
    ],
  },
  {
    path: "/growth-chart",
    element: <GrowthTarget dofins={true} />,
    name: "Dofins's Growth Target",
    children: [
      {
        icon: <AssignmentIcon sx={color} />,
        path: "",
        element: <Test />,
        name: "Dofins's Growth Target",
      },
    ],
  },
];
