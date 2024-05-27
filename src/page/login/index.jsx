import AuthenTemplate from "../../component/authen-template";
import "./index.scss";
import {Form, Input} from "antd";
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
          <Form className="form-login"  labelCol={{
            span:24
          }}>
            <Form.Item  label="Email address:" name="Email-address" rules={[
              {
                required: true,
                message: 'This box cannot be left blank'
              }
            ]}>
              <Input className="button-Email-address"
              type="text"
              placeholder=" Enter your Email" />
            </Form.Item>
          </Form>
          
          <Form className="form-login" labelCol={{
            span:24
          }}>
            <Form.Item className="" label="Password:" name="Password" rules={[
              {
                required: true,
                message: 'This box cannot be left blank'
              }
            ]}>
               
              <Input className="button-Password"
              type="password"
              placeholder=" Enter your Password" />
            </Form.Item>
          </Form>
         
          <a href="../forgotPass" class="forgot-password-link">
              Forgot password
            </a>
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
