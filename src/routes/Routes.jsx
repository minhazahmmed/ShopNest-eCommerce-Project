import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";

import MainPage from "../pages/MainPage";
import Home from "../pages/Home";
import Error from "../pages/Error";
import About from "../pages/About";
import ScrollToTop from "../components/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootLayout />
        <ScrollToTop />
      </>
    ),
    errorElement: <Error></Error>,
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
    ],
  },
]);

export default router;
