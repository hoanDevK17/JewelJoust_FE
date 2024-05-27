import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";
import ForgotPass from "./page/forgotPass/forgotPass";

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
  ]);
  return <RouterProvider router={router} />
}