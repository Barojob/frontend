import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
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
    path: "/home",
    element: <HomePage />,
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
] satisfies RouteObject[];
