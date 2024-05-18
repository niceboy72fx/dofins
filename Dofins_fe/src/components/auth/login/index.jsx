import React from "react";
import { LoginForm } from "./form";
import { useSnackbar } from "notistack";
import RequestUtil from "../../../service/helper/requestUtil";
import { urlMap } from "../../../service/urls";
import StorageUtil from "../../../service/helper/storage";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import NavUtil from "../../../service/helper/navUtil";

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = StorageUtil.getToken("token");
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  const { enqueueSnackbar } = useSnackbar();
  const { prefix, endpoints } = urlMap.auth;
  const handleLogin = (data) => {
    RequestUtil.apiCallWithRefreshToken(prefix + endpoints.login, data, "POST")
      .then((req) => {
        enqueueSnackbar("Login Success !", "success");
        StorageUtil.setStorage("token", req?.data?.access_token);
        StorageUtil.setStorage("refresh-token", req?.data?.refresh_token);
        StorageUtil.setStorage("email", req?.data?.email);
        StorageUtil.setStorage("username", req?.data?.username);
        navigate("/");
      })
      .catch((error) => enqueueSnackbar(error, "error"));
  };

  return (
    <>
      <LoginForm handleLogin={handleLogin} />
    </>
  );
};
