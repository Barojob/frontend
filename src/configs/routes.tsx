import { type RouteObject } from "react-router-dom";
import JobPostingPage from "../pages/Employer/JobPostingPage";
import JobPostLocation from "../pages/Employer/JobPostLocation";
import IntroPage from "../pages/IntroPage";
import JobRequest from "../pages/JobRequest";
import LoginPage from "../pages/LoginPage";
import LoginSuccessPage from "../pages/LoginSuccessPage";
import MainPage from "../pages/MainPage";
import SignupAccountPage from "../pages/SignupAccountPage";
import SignupLicensePage from "../pages/SignupLicensePage";
import SignupPage from "../pages/SignupPage";
import SignupSuccessPage from "../pages/SignupSuccessPage";

export const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/job-post-location",
    element: <JobPostLocation />,
  },
  {
    path: "/job-posting",
    element: <JobPostingPage />,
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
    path: "/signup/account",
    element: <SignupAccountPage />,
  },
  {
    path: "/signup/license",
    element: <SignupLicensePage />,
  },
  {
    path: "/signup-success",
    element: <SignupSuccessPage />,
  },
  {
    path: "/job-request",
    element: <JobRequest />,
  },
] satisfies RouteObject[];
