import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SecondaryListItems } from "./listItem";
import { Outlet } from "react-router-dom";
import SearchAppBar from "./searchBar";
import { ToolBarCustom } from "./toolBar";
import IconHeader from "../../../../assets/logo_header.png";
import PopUp from "../../../popUp";
import { useRecoilValue } from "recoil";
import { popUp } from "../../../../state";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: "white"
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export const LayOut = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const pop = useRecoilValue(popUp);

  return (
    <div className="">
      {pop.open === true ? <PopUp emits={pop} /> : null}
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
                backgroundColor: "#0F1729",
                color: "black",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none",     color: "white"
                }),
                }}
              >
                <MenuIcon sx={{ color: "whitesmoke" }} />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
              >
                <img src={IconHeader} width={100} className="mr-10" />
                <SearchAppBar />
              </Typography>
              <ToolBarCustom />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              backgroundColor: "#111827",
              "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                backgroundColor: "#111827",
                color: "white",
              },
            }}
            className="shadow-2xl"
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon sx={{                color: 'white'}} />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              backgroundColor: "#111827",
            }}
          >
            <Toolbar />
            <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
