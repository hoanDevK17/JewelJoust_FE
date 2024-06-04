import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function HomePage() {

  const user = useSelector(selectUser);
  return (
    <>
    <div>homePage</div>
    <h1>{user?.fullname}</h1>
    </>
  );
}