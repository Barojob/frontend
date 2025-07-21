import { type RouteObject } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import SignupLicensePage from "../pages/SignupLicensePage";
import SignupPage from "../pages/SignupPage";

export const routes = [
  {
    path: "/",
    element: <MainPage />,
  },

  {
    path: "/intro",
    element: <IntroPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signup/license",
    element: <SignupLicensePage />,
  },
] satisfies RouteObject[];
