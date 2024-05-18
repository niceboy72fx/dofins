import { createBrowserRouter } from "react-router-dom";

import { Login } from "./components/auth/login/index.jsx";
import App from "./App.jsx";
import { NotFound404 } from "./components/common/route/notFound404.jsx";
import { SignUp } from "./components/auth/signUp";
import { LayOut } from "./components/common/layout/main/index.jsx";
import PrivateRoute from "./components/common/route/privateRoute.jsx";
import DashBoard from "./components/page/dashBoard/index.jsx";
import { pageCms } from "./components/page/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },
      {
        path: "register",
        children: [
          {
            path: "",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "",
        element: <LayOut />,
        children: [
          {
            path: "",
            element: <PrivateRoute />,
            children: [...pageCms],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
]);
export default router;
