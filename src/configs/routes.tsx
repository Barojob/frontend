import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import SignupAccountPage from "@/pages/SignupAccountPage";
import SignupPage from "@/pages/SignupPage";
import { type RouteObject } from "react-router-dom";
import IntroPage from "../pages/IntroPage";

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
    path: "/signup/account",
    element: <SignupAccountPage />,
  },
] satisfies RouteObject[];
