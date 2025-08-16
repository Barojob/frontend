import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import AppUrlListener from "./AppUrlListener";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <AppUrlListener />
    </BrowserRouter>
  );
};

export default AppRouter;
