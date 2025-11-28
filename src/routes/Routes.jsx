import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";

import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            path: '/',
            element: <MainPage/>
        }
    ]
  },
]);

export default router;