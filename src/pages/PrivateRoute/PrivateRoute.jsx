import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ redirectTo, component , isAuth }) => {
  return isAuth ?  component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;