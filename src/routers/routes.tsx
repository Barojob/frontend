import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const CommuteRangePage = lazy(() => import("@/pages/CommuteRangePage"));
const JobPostingPage = lazy(() => import("@/pages/Employer/JobPostingPage"));
const JobPostLocation = lazy(() => import("@/pages/Employer/JobPostLocation"));
const MatchingResultsPage = lazy(
  () => import("@/pages/Employer/MatchingResultsPage"),
);
const IntroPage = lazy(() => import("@/pages/IntroPage"));
const JobRequestPage = lazy(() => import("@/pages/JobRequestPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const LoginSuccessPage = lazy(() => import("@/pages/LoginSuccessPage"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const MatchingListPage = lazy(() => import("@/pages/MatchingListPage"));
const PaymentPage = lazy(() => import("@/pages/PaymentPage.tsx"));
const ReviewWritePage = lazy(() => import("@/pages/ReviewWritePage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const WorkerMatchHistoryPage = lazy(
  () => import("@/pages/Worker/WorkerMatchHistoryPage "),
);
const WorkerDetailsPage = lazy(() => import("@/pages/WorkerDetailsPage"));

export const routes: RouteObject[] = [
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
    path: "/matching-list",
    element: <MatchingListPage />,
  },
  {
    path: "/review-write/:id",
    element: <ReviewWritePage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
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
];
