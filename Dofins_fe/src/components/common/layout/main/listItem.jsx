import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { pageCms } from "../../../page/page";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

export const SecondaryListItems = () => {
  const navigate = useNavigate();
  return (
    <>
      {pageCms.map((item) => (
        <React.Fragment key={item}>
          {item.children.map((itemChild) => (
            <ListItemButton key={itemChild} onClick={() => navigate(item.path)}>
              <ListItemIcon>{itemChild.icon}</ListItemIcon>
              <ListItemText primary={itemChild.name} />
            </ListItemButton>
          ))}
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};
