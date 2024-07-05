import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./footer.scss";
import { useNavigate } from "react-router-dom";
export default function footer() {
  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
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
          onClick={
            handleClick
          }
        >
          Home
        </span>
        <span
          className="button-link"
          onClick={() => {
            navigate("/sessions");
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
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
          <EnvironmentOutlined /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000
        </p>
      </div>
    </div>
  );
}
