import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./page/login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  return <RouterProvider router={router} />
}