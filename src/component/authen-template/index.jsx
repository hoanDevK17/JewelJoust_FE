import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function AuthenTemplate({ children }) {
  const navigate = useNavigate();
  return (
    <div className="authen-template">
      <div className="authen-template__content">
        <div className="authen-template__content__form">
          <div className="wrapper">
            <img
              src="public/Logo.svg"
              onClick={() => {
                navigate("/homepage");
                console.log("oke");
              }}
            />
            {children}
          </div>
        </div>
        <div className="authen-template__content__background">
          <img src="/image.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
