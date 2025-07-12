import React from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import PresenceTransition from "../components/PresenceTransition";
import { routes } from "../configs/routes";

const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedRouteRenderer />
    </BrowserRouter>
  );
};

const AnimatedRouteRenderer: React.FC = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <PresenceTransition
      className="h-full"
      transitionKey={location.pathname}
      variant="subtleRise"
    >
      {element}
    </PresenceTransition>
  );
};

export default RouterProvider;
