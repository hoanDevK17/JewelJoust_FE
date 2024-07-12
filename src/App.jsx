import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";
import ForgotPass from "./page/forgotPass/forgotPass";
import ManageAcount from "./page/manageAcount/index";
import Dashboard from "./component/dashborad/dashborad";
import Category from "./component/test/test";
import AuctionSession from "./component/auction-sessions/sessions";
import ResetPass from "./page/resetPass/resetPass";
import Detail from "./component/Detail/detail";
import ScrollToTop from "./component/Scroll-to-Top/scroll";
import Acount from "./page/manageAcount/index";

import HomePage from "./page/homepage/homePage";
import Wallet from "./page/Wallet/Wallet";
import Profile from "./page/profile/profile";
import ManageRequest from "./page/manageRequest/index";
import ManageSession from "./page/manageSession/index";
import ActiveHistory from "./page/ActiveHistory/ActiveHistory";
import AuctionRequestSell from "./page/AuctionRequestSell/AuctionRequestSell";
import BidAmoutHistory from "./page/BidAmoutHistory/BidAmoutHistory";

import WalletHistory from "./page/WalletHistory/WalletHistory";
import RequestSellHistory from "./page/HistoryRequsestSell/RequestSellHistory";
import RegistrationSessionHistory from "./page/HistoryRegistrationSession";
import useRealtime from "./assets/hook/useRealTime";
import Payment from "./page/Payment/Payment";
import ConditionsAndServices from "./page/conditionsAndServices/conditionsAndServices";
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
      path: "/ConditionsAndServices",
      element: <ConditionsAndServices />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPass />,
    },
    {
      path: "reset-password",
      element: <ResetPass />,
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
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/auctionRequestSell",
      element: <AuctionRequestSell />,
    },
    {
      path: "/ActiveHistory",
      element: <ActiveHistory />,
      children: [
        {
          path: "/ActiveHistory/RequestSell",
          element: <RequestSellHistory />,
        },
        {
          path: "/ActiveHistory/RegistrationSession",
          element: <RegistrationSessionHistory />,
        },
      ],
    },
    {
      path: "/Wallet",
      element: <Wallet />,
      children: [
        // {

        //   path: "/Wallet/Withdrawal",
        //   element: <WithdrawalHistory />,
        // },
        {
          path: "/Wallet/BidAmoutHistory",
          element: <BidAmoutHistory />,
        },
        {
          path: "/Wallet/History",
          element: <WalletHistory />,
        },
      ],
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
        {
          path: "/dashboard/session",
          element: <ManageSession />,
        },
      ],
    },
    {
      path: "/sessions",
      element: <AuctionSession />,
    },
    {
      path: "/detail/:id",
      element: (
        <ScrollToTop>
          <Detail />
        </ScrollToTop>
      ),
    },

    {
      path: "/bidding",
      element: <RegistrationSessionHistory/>,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
  ]);

  useRealtime((data) => {
    console.log(data);
  });

  return <RouterProvider router={router} />;
}
