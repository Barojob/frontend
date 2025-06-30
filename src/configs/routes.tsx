import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import SignupPage from "@/pages/SignupPage";
import { type RouteObject } from "react-router-dom";

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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
] satisfies RouteObject[];
