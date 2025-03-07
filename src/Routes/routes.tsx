import HomePage from "@/pages/HomePage";
import JobRequestPage from "@/pages/JobRequestPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import SignupPage from "@/pages/SignupPage";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <HomePage />,
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
    path: "/",
    element: <MainPage />,
  },
  {
    path: "jobrequest",
    element: <JobRequestPage />,
  },
];

export default routes;
