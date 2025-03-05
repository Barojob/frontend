import { useLocation, useRoutes } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import routes from "./routes";

const Router = () => {
  const renderedRoutes = useRoutes(routes);

  const location = useLocation();
  return (
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames={"scale"}
        unmountOnExit
      >
        {renderedRoutes}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Router;
