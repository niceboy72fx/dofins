import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import StorageUtil from "../../../../service/helper/storage";
import NavUtil from "../../../../service/helper/navUtil";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Clock from "./clock";
import TextRunning from "./textRunning";

const useStyles = makeStyles({
  menuPaper: {
    ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
      backGroundColor: "#111827",
    },
  },
});

export const ToolBarCustom = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const username = StorageUtil.getStorageObj("username");
  const navigate = useNavigate();

  const settings = ["Profile", "Logout"];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleItemMenu = (event) => {
    if (event.target.textContent === "Logout") {
      NavUtil.logout();
    }
  };

  const classes = useStyles();

  return (
    <div className="flex items-center justify-center">
      <TextRunning />
      <Clock />
      {/* <IconButton color="inherit">
        <Badge badgeContent={4} color="warning">
          <NotificationsIcon color="info" />
        </Badge>
      </IconButton> */}

      <Box sx={{ marginLeft: 7 }}>
        {/* <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <AccountCircle sx={{ color: "black", width: 32, height: 32 }} />
            <p className="font-bold text-white text-sm p-3 ">{username}</p>
          </IconButton>
        </Tooltip> */}
        <Menu
          sx={{ mt: "45px", backgroundColor: "rgba(255,255,255)" }}
          id="menu-appbar"
          classes={classes.menuPaper}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography onClick={handleItemMenu} textAlign="center">
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
};
