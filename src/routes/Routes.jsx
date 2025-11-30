import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";

import MainPage from "../pages/MainPage";
import Home from "../pages/Home";
import Error from "../pages/Error";
import About from "../pages/About";
import ScrollToTop from "../components/ScrollToTop";

import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootLayout />
        <ScrollToTop />
      </>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },

 
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
