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
              onClick={()=>{
                navigate('/')
              }}
            />
            {children}
          </div>
        </div>
        <div className="authen-template__content__background">
        <span
            className="button-link"
            onClick={() => {
              navigate("/homepage");
            }}
          >
           <img src="./image.svg" alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}
