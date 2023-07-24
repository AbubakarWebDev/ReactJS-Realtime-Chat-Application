import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Error404 from "../pages/Error404";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";

import PrivateRoutes from "../components/PrivateRoutes";
import privateRoutesLoader from "./privateRoutesLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        loader: privateRoutesLoader,
        element: <PrivateRoutes protect={true} />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        loader: privateRoutesLoader,
        element: <PrivateRoutes protect={false} />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/reset-password/:userId/:token",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

export default router;