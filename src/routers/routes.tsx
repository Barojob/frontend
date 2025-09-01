import CommuteRangePage from "@/pages/CommuteRangePage";
import JobPostingPage from "@/pages/Employer/JobPostingPage";
import JobPostLocation from "@/pages/Employer/JobPostLocation";
import MatchingResultsPage from "@/pages/Employer/MatchingResultsPage";
import IntroPage from "@/pages/IntroPage";
import JobRequestPage from "@/pages/JobRequestPage";
import LoginPage from "@/pages/LoginPage";
import LoginSuccessPage from "@/pages/LoginSuccessPage";
import MainPage from "@/pages/MainPage";
import SignupPage from "@/pages/SignupPage";
import WorkerMatchHistoryPage from "@/pages/Worker/WorkerMatchHistoryPage ";
import WorkerDetailsPage from "@/pages/WorkerDetailsPage";
import { type RouteObject } from "react-router-dom";

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
    path: "/matching-results",
    element: <MatchingResultsPage />,
  },
  {
    path: "/commute-range",
    element: <CommuteRangePage />,
  },
  {
    path: "/worker-detail",
    element: <WorkerDetailsPage />,
  },
  {
    path: "/worker-match-history",
    element: <WorkerMatchHistoryPage />,
  },
] satisfies RouteObject[];
