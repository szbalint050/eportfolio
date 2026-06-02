import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Schedule from "./pages/Schedule";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "profile", Component: Profile },
      { path: "projects", Component: Projects },
      { path: "schedule", Component: Schedule },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
