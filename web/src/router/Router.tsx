import { createBrowserRouter } from "react-router-dom";

import { AuthRoute } from "./routeGuards/AuthRoute";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { EventsPage } from "../pages/EventsPage/EventsPage";
import { LogoutPage } from "../pages/LogoutPage/LogoutPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },

  {
    path: "/logout",
    element: <LogoutPage />,
  },

  {
    path: "/",
    element: <AuthRoute />,
    children: [{ path: "/events", element: <EventsPage /> }],
  },
]);
