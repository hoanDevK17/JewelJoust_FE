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
import WithDrawal from "./page/withdrawal/withdrawal";
import WalletHistory from "./page/WalletHistory/WalletHistory";
import RequestSellHistory from "./page/HistoryRequsestSell/RequestSellHistory";
import RegistrationSessionHistory from "./page/HistoryRegistrationSession";
import useRealtime from "./assets/hook/useRealTime";
import Payment from "./page/Payment/Payment";
import ConditionsAndServices from "./page/conditionsAndServices/conditionsAndServices";
import AcountStatistics from "./page/AcountStatistics/AcountStatistics";
import RequestStatistics from "./page/RequestStatistics/RequestStatistics";
import SessionStatistics from "./page/SessionStatistics/SessionStatistics";
import Revenues from "./page/Revenue/Revenue";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  // RadarElement,  
} from "chart.js";
ChartJS.register(
  CategoryScale, // Đối với biểu đồ cột và biểu đồ đường
  LinearScale, // Đối với biểu đồ cột và biểu đồ đường
  BarElement, // Đối với biểu đồ cột
  Title, // Tên biểu đồ
  Tooltip, // Tooltip
  Legend, // Chú giải
  ArcElement, // Đối với biểu đồ tròn và biểu đồ doughnut
  PointElement, // Đối với biểu đồ đường
  LineElement, // Đối với biểu đồ đường
  RadarController // Đối với biểu đồ radar
  // RadarElement // Đối với biểu đồ radar
);
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
          path: "/dashboard/withdrawal",
          element: <WithDrawal />,
        },
        {
          path: "/dashboard/acount/:pageNum",
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
        {
          path: "/dashboard/revenue",
          element: <Revenues />,
        },
        {
          path: "/dashboard/sessionstatistics",
          element: <SessionStatistics />,
        },
        {
          path: "/dashboard/requeststatistics",
          element: <RequestStatistics />,
        },
        {
          path: "/dashboard/acountstatistics",
          element: <AcountStatistics />,
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
      element: <RegistrationSessionHistory />,
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
