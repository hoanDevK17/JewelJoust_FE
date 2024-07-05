import { Button, Form, Input, Spin, DatePicker } from "antd";
import AuthenTemplate from "../../component/authen-template";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
import { APIregis } from "../../api/api";
import dayjs from "dayjs";
import { current } from "@reduxjs/toolkit";
import moment from "moment";

export default function Registration() {
  const navigate = useNavigate();
  const onChangeDate = (date, dateString) => {
    setBirthdayUser(dateString);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [birthdayUser, setBirthdayUser] = useState("");

  const regis = (user) => {
    user.birthday = birthdayUser;

    console.log(user);
    setIsLoading(true);
    APIregis(
      user.username,
      user.password,
      user.fullname,
      user.email,
      user.phone,
      user.address,
      user.birthday
    )
      .then((rs) => {
        console.log(rs);
        if (rs.status === 200) {
          navigate("/login");
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

  const validateRules = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("This box cannot be left blank"));
    }
    if (value.trim().length === 0) {
      return Promise.reject(new Error("Whitespace is not allowed"));
    }
    if (value.trim().length < 3) {
      return Promise.reject(new Error("you must be enter least 3 characters"));
    }
    return Promise.resolve();
  };

  const passwordValidator = (_, value) => {
    if (!value) {
      return Promise.resolve(new Error("This box cannot be left blank"));
    }
    if (value.trim().length < 6) {
      return Promise.reject(new Error("you must be enter least 6 characters"));
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (hasUpperCase && hasLowerCase && hasSpecialChar) {
      return Promise.resolve();
    }
    return Promise.reject("Password must have one uppercase, lowercase letter and one special character.");
  };

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
              <Form
                autoComplete="off"
                className="boxs-conten"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24}}
                onFinish={regis}
              >
                <Form.Item
                  className="conten-name"
                  label="Username"
                  name="username"
                  rules={[
                    {
                      validator: validateRules,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="text"
                    placeholder=" Enter your username"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="password"
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: passwordValidator
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="password"
                    placeholder=" Enter your Password"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Confirm password"
                  name="Confirm-password"
                  dependencies={["password"]}
                  style={{ marginBottom: "16px" }}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered does not match."
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="password"
                    placeholder=" Enter your Password"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Full Name"
                  name="fullname"
                  rules={[
                    {
                      validator: validateRules,
                    },
                  ]}
                  hasFeedback
                  >
                  <Input
                    className="conten-mess"
                    type="text"
                    placeholder=" Enter your Full Name"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Email address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "This box cannot be left blank",
                    },
                    {
                      type: "email",
                      message: "Please type Email",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="text"
                    placeholder=" Enter your Email address"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        "This box cannot be left blank, just enter number",
                    },
                    { whitespace: true, message: "Phone don't have space" },
                    {
                      pattern: "[0-9]{10}",
                      min: 9,
                      max: 11,
                      message: "Phone must contain between 9 to 11 number",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="tel"
                    placeholder="Enter your PhoneNumber"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Address"
                  name="address"
                  rules={[
                    {
                      validator: validateRules,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="conten-mess"
                    type="text"
                    placeholder="Enter your Address"
                  />
                </Form.Item>
                <Form.Item
                  className="conten-name"
                  label="Birth Day"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: "This box cannot be left blank, just enter date",
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    className="conten-mess"
                    type="date"
                    maxDate={dayjs(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")}
                    placeholder="Enter your Birth Day"
                    onChange={onChangeDate}
                    needConfirm
                  />
                </Form.Item>
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {errorMessage ? errorMessage : ""}
                </p>
                <Form.Item className="button-regis">
                  <Button
                    className="button-regis-in"
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
                      height: "69px",
                    }}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
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
      )}
    </>
  );
}
