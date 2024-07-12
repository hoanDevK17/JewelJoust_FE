import { useState } from "react";
import AuthenTemplate from "../../component/authen-template";
import "./forgotPass.scss";
import { Button, Form, Input, message } from "antd";
import { APIForgotpass } from "../../api/api";
export default function ForgotPass() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (value) => {
    if (!isSubmit) {
      APIForgotpass(value.email)
        .then((response) => {
          console.log("response", response);
          if (response.status == "200") {
            message.success("Sent email reset password successfully");
            setIsSubmit(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setErrorMessage("Gửi mail thất bại");
        })
        .finally(() => {});
    }
  };
  return (
    <AuthenTemplate>
      <div className="content">
        <div className="message">
          <h2>FIND YOUR ACCOUNT</h2>
          <p>Please enter your email address to search for your account.</p>
        </div>
        <div className="form">
          <Form
            onFinish={handleSubmit}
            labelCol={{
              span: 24,
            }}
          >
            <Form.Item
              label="Email"
              type="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
            <p
              style={{
                color: "red",
              }}
            >
              {errorMessage && errorMessage}
            </p>
            <div className="button-reset">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AuthenTemplate>
  );
}
// pretieer
