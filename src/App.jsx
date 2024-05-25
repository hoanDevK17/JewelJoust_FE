import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";
import Registration from "./page/registration";

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
  ]);
  return <RouterProvider router={router} />
}