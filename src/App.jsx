import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";
import ForgotPass from "./page/forgotPass/forgotPass";
import ManageAcount from "./page/manageAcount/index";
import Dashboard from "./component/dashborad/dashborad";
import Category from "./component/test/test";
import Acount from "./page/manageAcount/index"
import HomePage from "./page/homepage/homePage";
import CreateBidRequest from "./page/createBidRequest/createBidRequest";
import Profile from "./page/profile/profile";
import AuctionSession from "./component/auction-sessions/sessions";
import ResetPass from "./page/resetPass/resetPass";
import Detail from "./component/Detail/detail";
import ScrollToTop from "./component/Scroll-to-Top/scroll";

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
      path: "reset-password",
      element: <ResetPass />
    }
    ,
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
        }
      ],
    },
    {
      path: "/sessions",
      element: <AuctionSession />
    },
    {
      path: "/detail/:id",
      element:
        <ScrollToTop>
          <Detail />
        </ScrollToTop>

    },
  ]);

  return <RouterProvider router={router} />
}

