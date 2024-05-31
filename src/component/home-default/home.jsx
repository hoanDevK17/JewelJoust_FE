import { EnvironmentOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
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
      <div className="footer">
        <div className="footer-content">
          {" "}
          <h4>Serenity </h4>
          <p>
          Uncover Radiant Beauty - Precious Gems at Our Auction House</p>
          <div className="footer-logo">
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            <FacebookOutlined />
          </span>
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
           <InstagramOutlined />
          </span>
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
                       <TwitterOutlined   />

          </span>
          <span
            className="span-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            <YoutubeOutlined />
          </span>
          </div>
        </div>
        <div className="footer-content">
          <h4>Quick Links</h4>
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
              console.log("111");
              navigate("/homepage");
            }}
          >
            Jewelry Auction
          </span>
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            Products
          </span>
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            News
          </span>{" "}
          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/homepage");
            }}
          >
            About Us
          </span>
        </div>
        <div className="footer-content">
          <h4> Contact Us</h4>
          <p> <PhoneOutlined /> 424-947-9877</p>
          <p><MailOutlined /> Luminary.@gmail.com</p>
          <p><EnvironmentOutlined /> 9256 Abigail Forges, Sao Tome and Principe</p>
        </div>
      </div>
    </div>
  );
}
