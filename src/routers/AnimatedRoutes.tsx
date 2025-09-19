import LoadingScreen from "@/components/LoadingScreen";
import PresenceTransition from "@/components/PresenceTransition";
import { routes } from "@/routers/routes";
import React, { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <PresenceTransition
      className="h-full"
      transitionKey={location.pathname}
      variant="softFadeIn"
    >
      <Suspense fallback={<LoadingScreen />}>{element}</Suspense>
    </PresenceTransition>
  );
};

export default AnimatedRoutes;
