import LoginPage from "@/pages/LoginPage";
import LoginSuccessPage from "@/pages/LoginSuccessPage";
import MainPage from "@/pages/MainPage";
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
    path: "/login-success",
    element: <LoginSuccessPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
] satisfies RouteObject[];
