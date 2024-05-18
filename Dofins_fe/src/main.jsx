import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import "antd/dist/reset.css";
import PreLoader from "./components/preLoader/preLoader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <SnackbarProvider
      maxSnack={3}
      transitionDuration={500}
      autoHideDuration={1000}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </RecoilRoot>
  // </React.StrictMode>,
);
