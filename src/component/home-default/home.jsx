import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./home.scss";
import { useNavigate } from "react-router-dom";

export default function HomePage({ children }) {
  const navigate = useNavigate();
  return (
    <div className="home-default">
      <div className="home-page-header">
        <div className="home-page-logo">
          <img src="./Logo.svg" alt="" />
        </div>
        <div className="home-page-title">
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            Home
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Jewelry Auction
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Products
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            News
          </span>

          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            About Us
          </span>
        </div>
        <div className="home-page-login">
          <span
            className="button-link"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Login
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/registration");
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
      <div className="home-page-body">{children}</div>
      
    </div>
  );
}
