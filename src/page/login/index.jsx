import AuthenTemplate from "../../component/authen-template";
import "./index.scss";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
const navigate = useNavigate();

  return (
    <AuthenTemplate>
      <div className="Login-page">
        <div className="Login-page-welcome">
          <h2>Welcome Jeweljoust!</h2>
          <p>Enter your Credentials to access your account</p>
        </div>
        <div className="Login-page-input">
          {" "}
          <p>Email address: </p>
          <input type="text" placeholder=" Enter your email"/>
          <div className="forgot-password">
            <p>Password:</p>
            <a href="../forgotPass" class="forgot-password-link">
              forgot password
            </a>
          </div>
          <input type="password" placeholder=" Enter your password"/>
          <div className="check-box">
            <input
              type="checkbox"
              id="remember-password"
              name="remember-password"
              
            />
            <label for="remember-password">Remember for 30 days</label>
          </div>
        </div>

        <div className="button-login">
        <ButtonPrimary
            title="Login"
            Onclick={() => {
              navigate("/");
            }}
          />
          <span>or</span>
          <div className="Login-google-facebook">
            <button><img src="./IconGoogle.svg" alt=""title="" />Sign in with Google</button>
            <button><img src="./Facebook.jpg" alt="" />Sign in with Facebook</button>
          </div>
        </div>
        <div className="sign-up">
          Don’t have an account?
          <a
            href="../registration"
            class="sign-up-link"
          >
            Sign Up
          </a>
        </div>
      </div>
    </AuthenTemplate>
  );
}
