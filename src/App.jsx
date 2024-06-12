import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";
import ForgotPass from "./page/forgotPass/forgotPass";
import ManageAcount from "./page/manageAcount/index";
import Dashboard from "./component/dashborad/dashborad";
import Category from "./component/test/test";
import Acount from "./page/manageAcount/index";
import RegisterAuction from "./page/RegisterAuction";
import HomePage from "./page/homepage/homePage";
import CreateBidRequest from "./page/createBidRequest/createBidRequest";
import Profile from "./page/profile/profile";
import ManageRequest from "./page/manageRequest/index";
import History from "./page/history/history";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPass />,
    },
    {
      path: "/manageAcount",
      element: <ManageAcount />,
    },
    {
      path: "/homepage",
      element: <HomePage />,
    },
    {
      path: "/createBidRequest",
      element: <CreateBidRequest />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/RegisterAuction",
      element: <RegisterAuction />,
    },
    {
      path: "/history",
      element: <History />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/category",
          element: <Category />,
        },
        {
          path: "/dashboard/acount",
          element: <Acount />,
        },
        {
          path: "/dashboard/request",
          element: <ManageRequest />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
