import React from "react";
import { Context } from "../store/appContext";
import { Outlet } from "react-router-dom";
import { Login } from "./login";
import { useContext } from "react";

const useAuth = () => {
  const { store, actions } = useContext(Context);
  return store.isAuthenticated;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};
