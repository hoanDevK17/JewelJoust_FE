import AuthenTemplate from "../../component/authen-template";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Form, Input, message } from "antd";
import { APIResetPass } from "../../api/api";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

export default function ResetPass() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [form] = useForm();

  const handleSubmit = (user) => {
    APIResetPass(user.password, token).then((rs) => {
      if (rs.status === 200) {
        // navigate('/homepage')
        // alert("Change Password succeesfully")
        success();
        setTimeout(() => {
          navigate("/homepage");
        }, 1500);
      } else {
        error();
      }
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Change password successfully",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Fail to change password",
    });
  };

  return (
    <AuthenTemplate>
      {/* <button onClick={handleSubmit}>Submitg</button> */}
      <div>
        {contextHolder}
        <h1>Please enter your new password!</h1>
        <div className="reset-form">
          <Form
            className="form-reset"
            labelCol={{
              span: 24,
            }}
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item
              name="password1"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="password"
              label="Confirm Password"
              dependencies={["password1"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password1") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
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
              Reset password
            </Button>
          </Form>
        </div>
      </div>
    </AuthenTemplate>
  );
}

// pretieer
