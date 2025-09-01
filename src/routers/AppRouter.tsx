import AnimatedRoutes from "@/routers/AnimatedRoutes";
import AppDeepLinkHandler from "@/routers/AppDeepLinkHandler";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <AppDeepLinkHandler />
    </BrowserRouter>
  );
};

export default AppRouter;
