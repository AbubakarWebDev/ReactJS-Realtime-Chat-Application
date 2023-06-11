import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error404 from "../pages/Error404";
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import PrivateRoutes from '../components/PrivateRoutes';

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
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
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <Error404 />,
  }
]);

export default router;