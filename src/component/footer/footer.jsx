import {
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    YoutubeOutlined,
  } from "@ant-design/icons";
  import "./footer.scss"
import { useNavigate } from "react-router-dom";
export default function footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
        <div className="footer-content">
          {" "}
          <h4>Serenity </h4>
          <p>Uncover Radiant Beauty - Precious Gems at Our Auction House</p>
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
              <TwitterOutlined />
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
          <p>
            {" "}
            <PhoneOutlined /> 424-947-9877
          </p>
          <p>
            <MailOutlined /> Luminary.@gmail.com
          </p>
          <p>
            <EnvironmentOutlined /> 9256 Abigail Forges, Sao Tome and Principe
          </p>
        </div>
      </div>
  );
}