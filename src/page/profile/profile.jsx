import {
  Button,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import UserProfile from "../../component/home-default/home.jsx";
import {
  EditOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice.js";
import "./profile.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  // const user = useSelector(selectUser);
  const user = { fullname: "Hoan" };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Drawer
        title="Change Password"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form>
          <Col span={15}>
            <Form.Item
              name="Password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Password",
                },
              ]}
            >
              <Input size="large" placeholder="Please Enter Your Password" />
            </Form.Item>
          </Col>
          <Col span={15}>
            <Form.Item
              name="NewPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please Enter New Password",
                },
              ]}
            >
              <Input size="large" placeholder="Please Enter New Password" />
            </Form.Item>
          </Col>
          <Col span={15}>
            <Form.Item
              name="ConfirmPassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Confirm Password",
                },
              ]}
            >
              <Input size="large" placeholder="Please Enter Confirm Password" />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
      <UserProfile>
        <div 
            className="Form-all"
            >
          <Form
            style={{
              width: 600,
            }}
         
          >
            <Form.Item    className="Form" >
              <p>Name:</p>
              <Input
                size="large"
                defaultValue={user?.fullname}
                placeholder="   Enter your infomation"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item    className="Form" label="Email">
              <Input
                size="large"
                defaultValue={user?.email}
                placeholder="   Enter your infomation"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item    className="Phone">
              <Input
                size="large"
                type="tel"
                pattern="[0-9]{10}"
                defaultValue={user?.phone}
                prefix={<PhoneOutlined />}
              />
            </Form.Item>
            <Form.Item    className="Birthday" >
              <Input
                size="large"
                defaultValue={user?.address}
                placeholder="  Enter your infomation"
                prefix={<GiftOutlined />}
              />
            </Form.Item>
            <Form.Item    className="Form" label="Address">
              <Input
                size="large"
                defaultValue={user?.birthday}
                placeholder="   Enter your infomation"
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>
            <Form.Item    className="Form" label="Password">
              <Input
                disabled
                size="large"
                defaultValue={"\t" + "************"}
                placeholder="   Enter your infomation"
                prefix={<LockOutlined />}
                suffix={
                  <Button
                    type="primary"
                    onClick={showDrawer}
                    // icon={<PlusOutlined />}
                  >
                    <EditOutlined />
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item className="submit">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        
      </UserProfile>
    </>
  );
}
