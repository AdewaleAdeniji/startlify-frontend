import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import SingleDashboard from "../pages/dashboard/SingleDashboard";
import EmailDetail from "../pages/dashboard/EmailDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/app/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/app/dashboard/:emailAddressID",
    element: <SingleDashboard />,
  },
  {
    path: "/app/email/:emailID/:emailAddressID",
    element: <EmailDetail />,
  },
]);
export default router;
