import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";
import ForgotPass from "./page/forgotPass/forgotPass";
import ManageAcount from "./page/manageAcount/index";
import  HomePage  from "./page/homepage/homePage";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/registration",
      element: <Registration/>,
    },
    {
      path:'/forgotpassword',
      element:<ForgotPass/>
    },
    {
      path:'/manageAcount',
      element:<ManageAcount/>
    },
    {
      path:'/homepage',
      element:<HomePage/>
    },
  ]);
  return <RouterProvider router={router} />
}