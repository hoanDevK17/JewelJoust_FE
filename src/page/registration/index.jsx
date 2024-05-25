import AuthenTemplate from "../../component/authen-template";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import "./index.scss";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const navigate = useNavigate();
  return (
    <AuthenTemplate>
      <div className="big">
        <div className="wellcome">
          <p className="welcome-name">WELCONE JEWELJOUST!</p>
          <p className="wellcome-mess">
            Enter your details to register your account !
          </p>
        </div>
        <button className="buttion-regis-google">
          <img className="google-icon" src="public/IconGoogle.svg" alt="" />
          <p className="regis-google-text">Continue With Google</p>
        </button>
        <div className="boxs-conten">
          <div className="input-details">
            <p className="conten-name">Username</p>
            <input
              className="conten-mess"
              type="text"
              placeholder=" Enter your Username"
            />
          </div>
          <div className="input-details">
            <p className="conten-name">Password</p>

            <input
              className="conten-mess"
              type="password"
              placeholder=" Enter your Password"
            />
          </div>
          <div className="input-details">
            <p className="conten-name">Confirm password</p>
            <input
              className="conten-mess"
              type="password"
              placeholder=" Enter your Password"
            />
          </div>
          <div className="input-details">
            <p className="conten-name">Full Name</p>
            <input
              className="conten-mess"
              type="text"
              placeholder=" Enter your Full Name"
            />
          </div>
          <div className="input-details">
            <p className="conten-name">Email address</p>
            <input
              className="conten-mess"
              type="text"
              placeholder=" Enter your Email address"
            />
          </div>
          <div className="input-details">
            <p className="conten-name">PhoneNumber</p>
            <input
              className="conten-mess"
              type="text"
              placeholder="Enter your PhoneNumber"
            />
          </div>
        </div>
        <div className="button-regis">
          {/* <button className="button-star-regis">Register</button>
           */}
          <ButtonPrimary
            title="ABCD"
            Onclick={() => {
              navigate("/login");
            }}
          />
          <div className="login">
            <p className="login-text">Already have an account?</p>
            <span
              className="login-link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </AuthenTemplate>
  );
}
