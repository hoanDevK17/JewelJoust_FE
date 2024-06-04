import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

export default function Dashboard({ children }) {

  return (
    <div className="dashboard">
      <div className="dashboard__content">                                                                                                                                                                                                                                                                                                                                                  
        <div className="dashboard__content__form">
          <div className="wrapper">
            
          </div>
        </div>
        <div className="authen-template__content__page">
            {children}
        </div>
      </div>
    </div>
  );
}
