import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { configs } from "../configs";
import { DeepLinkTarget } from "../utils/url";
import AnimatedRoutes from "./AnimatedRoutes";
import AppUrlListener from "./AppUrlListener";

const AppRouter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <AppUrlListener
        scheme={configs.DEEP_LINK_SCHEME}
        host={configs.DEEP_LINK_HOST}
        onNavigate={handleNavigate}
      />
    </BrowserRouter>
  );

  function handleNavigate(target: DeepLinkTarget) {
    if (!target?.path) {
      return;
    }

    navigate(target.path);
  }
};

export default AppRouter;
