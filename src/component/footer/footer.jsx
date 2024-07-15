import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./footer.scss";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          justifyContent: "center",
          gap: "100px",
        }}
      >
        <div className="footer-content">
          {" "}
          <h4>Serenity </h4>
          <p>Sparkle with every bid, where precious gems find new admirers.</p>
        </div>
        <div className="footer-content">
          <h4>Quick Links</h4>
          <span className="button-link" onClick={handleClick}>
            Home
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/sessions");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Jewelry Auction
          </span>

          <span
            className="button-link"
            onClick={() => {
              console.log("111");
              navigate("/ConditionsAndServices");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Conditions And Services
          </span>
        </div>
        <div className="footer-content">
          <h4> Contact Us</h4>
          <p>
            {" "}
            <PhoneOutlined /> 037-481-4009
          </p>
          <p>
            <MailOutlined /> jeweljoust@gmail.com
          </p>
          <p>
            <EnvironmentOutlined /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,
            Thành Phố Thủ Đức, Hồ Chí Minh 700000
          </p>
        </div>
      </div>
    </div>
  );
}
