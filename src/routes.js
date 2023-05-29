import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Error404 from "./pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error404 />,
  }
]);

export default router;