import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";

import MainPage from "../pages/MainPage";
import Home from "../pages/Home";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <Error></Error>,
    children: [
        {
            path: '/',
            element: <MainPage/>
        },
        {
          path: '/home',
          element: <Home/>
        }
    ]
  },
]);

export default router;