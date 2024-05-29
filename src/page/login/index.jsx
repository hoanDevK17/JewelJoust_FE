import AuthenTemplate from "../../component/authen-template";
import "./index.scss";
import { Form, Input } from "antd";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../config/axios";
export default function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [passWord, setPassWord] = useState("");

  const login = async () => {
    try {
      const user = await api.post("login", {
        username: emailAddress,
        password: passWord
      });
      console.log(user);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error here, such as displaying an error message to the user
    }
  };

  return (
    <AuthenTemplate>
      <div className="Login-page">
        <div className="Login-page-welcome">
          <h2>Welcome Jeweljoust!</h2>
          <p>Enter your Credentials to access your account</p>
        </div>
        <div className="Login-page-input">
          <Form
            className="form-login"
            labelCol={{
              span: 24,
            }}
          >
            <Form.Item
              label="Email address:"
              name="Email-address"
              rules={[
                {
                  required: true,
                  message: "This box cannot be left blank",
                },
              ]}
            >
              <Input
                className="button-Email-address"
                type="text"
                placeholder=" Enter your Email"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </Form.Item>
          </Form>

          <Form
            className="form-login"
            labelCol={{
              span: 24,
            }}
          >
            <Form.Item
              className=""
              label="Password:"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "This box cannot be left blank",
                },
              ]}
            >
              <Input
                className="button-Password"
                type="password"
                placeholder=" Enter your Password"
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
              />
            </Form.Item>
          </Form>

          <span
            className="forgot-password-link"
            onClick={() => {
              navigate("/forgotpassword");
            }}
          >
            Forgot password
          </span>
        </div>

        <div className="button-login">
          <ButtonPrimary
            title="Login"
            Onclick={() => {
              // navigate("/");
              login();
            }}
          />
          <span>or</span>
          <div className="Login-google">
            <button>
              <img src="./IconGoogle.svg" alt="" title="" />
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="sign-up">
          Don’t have an account?
          <span
            className="sign-up-link"
            onClick={() => {
              navigate("/registration");
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </AuthenTemplate>
  );
}
