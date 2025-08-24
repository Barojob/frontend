import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import AppDeepLinkHandler from "./AppDeepLinkHandler";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <AppDeepLinkHandler />
    </BrowserRouter>
  );
};

export default AppRouter;
