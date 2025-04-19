import React from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import AnimatedTransition from "../component/AnimatedTransition";
import { routes } from "../configs/routes";

const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedRouteRenderer />
    </BrowserRouter>
  );
};

const AnimatedRouteRenderer = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <AnimatedTransition className="h-full" key={location.pathname}>
      {element}
    </AnimatedTransition>
  );
};

export default RouterProvider;
