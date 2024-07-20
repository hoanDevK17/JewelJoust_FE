import AuthenTemplate from "../../component/authen-template";
import "./index.scss";
import { Button, Form, Input, Spin } from "antd";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../config/axios";
import { APIlogin, APIloginWithToken } from "../../api/api";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/features/counterSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const login = async () => {
  //   try {
  //     const user = await api.post("login", {
  //       username: emailAddress,
  //       password: passWord
  //     });
  //     console.log(user);
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     // Handle the error here, such as displaying an error message to the user
  //   }
  // };

  const Handlelogin = (user) => {
    // console.log(user);
    setIsLoading(true);
    APIlogin(user.email, user.password)
      .then((rs) => {
        // console.log(rs);
        if (rs.status === 200) {
          dispatch(login(rs.data));
          localStorage.setItem("token", rs.data.token);
          rs.data.role == "MEMBER"
            ? navigate("/homepage")
            : navigate("/dashboard/acount/1");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLoginGoogle = async () => {
    setIsLoading(true);
    const result = await signInWithPopup(auth, provider);
    const token = result.user.accessToken;
    try {
      const response = await api.post("/login-google", { token: token });
      console.log(response.data);
      dispatch(login(response.data));
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      response.data.role == "MEMBER"
        ? navigate("/homepage")
        : navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsLoading(true);
      APIloginWithToken()
        .then((response) => {
          if (!response.data == "") {
            dispatch(login(response.data));
            localStorage.setItem("token", response.data.token);
            response.data.role == "MEMBER"
              ? navigate("/homepage")
              : navigate("/dashboard");
          } else {
            dispatch(logout());
          }
        })
        .catch((error) => {
          dispatch(logout());
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });
  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#fff9e8",
            paddingTop: "50vh",
          }}
        ></Spin>
      ) : (
        <AuthenTemplate>
          <div className="Login-page">
            <div className="Login-page-welcome">
              <h2>Welcome Jeweljoust!</h2>
              <p>Enter your Credentials to access your account</p>
            </div>
            <div className="Login-page-input">
              <Form
                className="form-login"
                hideRequiredMark
                labelCol={{
                  span: 24,
                }}
                onFinish={Handlelogin}
              >
                <Form.Item
                  label="User ID:"
                  name="email"
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
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="Password:"
                  name="password"
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
                  />
                </Form.Item>
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {errorMessage && errorMessage}
                </p>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#ffbe98",
                      border: "solid 4px #ffbe98",
                      color: "#ffffff",
                      borderRadius: "20px",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Button>
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
              <span>or</span>
              <div className="Login-google" onClick={handleLoginGoogle}>
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
      )}
    </>
  );
}
