import { type RouteObject } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import JobRequest from "../pages/JobRequest";
import LoginPage from "../pages/LoginPage";
import LoginSuccessPage from "../pages/LoginSuccessPage";
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
    path: "/login-success",
    element: <LoginSuccessPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signup/license",
    element: <SignupLicensePage />,
  },
  {
    path: "/job-request",
    element: <JobRequest />,
  },
] satisfies RouteObject[];
