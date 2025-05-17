import React from "react";
import Stairs from "../../common/TransitionPage/Stairs/Stairs";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <Stairs>
      <Header />
      <Outlet />
    </Stairs>
  );
};

export default Layout;
