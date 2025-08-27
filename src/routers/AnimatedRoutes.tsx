import PresenceTransition from "@/components/PresenceTransition";
import { routes } from "@/routers/routes";
import React from "react";
import { useLocation, useRoutes } from "react-router-dom";

const AnimatedRoutes: React.FC = () => {
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

export default AnimatedRoutes;
