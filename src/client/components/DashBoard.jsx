import React from "react";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      DashBoard <Outlet />
    </div>
  );
};

export default DashBoard;
