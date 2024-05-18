import React from "react";
import StorageUtil from "../../../service/helper/storage";
import { useLocation, Navigate } from "react-router-dom";
import { SignUpForm } from "./form";

export const SignUp = () => {
  const location = useLocation();
  const isAuthenticated = StorageUtil.getToken("token");
  if (isAuthenticated && location.pathname === "/register") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <SignUpForm />
    </>
  );
};
