import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AuthRoute } from "./routeGuards/AuthRoute";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <AuthRoute />,
    children: [{ path: "/app", element: <DashboardPage /> }],
  },
]);
