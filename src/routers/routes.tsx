import { type RouteObject } from "react-router-dom";
import CommuteRangePage from "../pages/CommuteRangePage";
import JobPostingPage from "../pages/Employer/JobPostingPage";
import JobPostLocation from "../pages/Employer/JobPostLocation";
import IntroPage from "../pages/IntroPage";
import JobRequestPage from "../pages/JobRequestPage";
import LoginPage from "../pages/LoginPage";
import LoginSuccessPage from "../pages/LoginSuccessPage";
import MainPage from "../pages/MainPage";
import SignupPage from "../pages/SignupPage";
import SignupSuccessPage from "../pages/SignupSuccessPage";
import WorkerDetailsPage from "../pages/WorkerDetailsPage";

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
  {
    path: "/job-posting",
    element: <JobPostingPage />,
  },
  {
    path: "/job-post-location",
    element: <JobPostLocation />,
  },
  {
    path: "/commute-range",
    element: <CommuteRangePage />,
  },
  {
    path: "/worker-detail",
    element: <WorkerDetailsPage />,
  },
] satisfies RouteObject[];
