import { type RouteObject } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import JobRequestPage from "../pages/JobRequestPage";
import LoginPage from "../pages/LoginPage";
import LoginSuccessPage from "../pages/LoginSuccessPage";
import MainPage from "../pages/MainPage";
import SignupPage from "../pages/SignupPage";
import SignupSuccessPage from "../pages/SignupSuccessPage";

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
    path: "/signup-success",
    element: <SignupSuccessPage />,
  },
  {
    path: "/job-request",
    element: <JobRequestPage />,
  },
] satisfies RouteObject[];
