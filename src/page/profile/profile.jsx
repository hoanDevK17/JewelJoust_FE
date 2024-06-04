import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Upload,
} from "antd";
import UserProfile from "../../component/home-default/home.jsx";
import {
  EditOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./profile.scss";

import { useState } from "react";
import ImgCrop from "antd-img-crop";

export default function Profile() {
  const user = { fullname: "Hoan" };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // edit avatar
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const [fileList, setFileList] = useState([]);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // edit pass word
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // confirm edit
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <UserProfile>
        <div className="profile">
          <div className="Avatar">
            <>
              <ImgCrop rotationSlider>
                <Upload
                  // action API
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </ImgCrop>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </>
          </div>
          <div className="Form-all">
            <Form
              style={{
                width: 600,
              }}
            >
              <Form.Item className="Form">
                <p>Name:</p>
                <Input
                  size="large"
                  defaultValue={user?.fullname}
                  placeholder="   Enter your infomation"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form">
                <p>Email:</p>
                <Input
                  size="large"
                  defaultValue={user?.email}
                  placeholder="   Enter your infomation"
                  prefix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form">
                <p>Phone:</p>
                <Input
                  size="large"
                  type="tel"
                  pattern="[0-9]{10}"
                  defaultValue={user?.phone}
                  placeholder="   Enter your infomation"
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form">
                <p>Birthday:</p>
                <Input
                  size="large"
                  defaultValue={user?.address}
                  placeholder="  Enter your infomation"
                  prefix={<GiftOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form">
                <p>Address:</p>
                <Input
                  size="large"
                  defaultValue={user?.birthday}
                  placeholder="   Enter your infomation"
                  prefix={<EnvironmentOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form">
                <p>Password:</p>
                <Input
                  disabled
                  size="large"
                  defaultValue={"\t" + "************"}
                  placeholder="   Enter your infomation"
                  prefix={<LockOutlined />}
                  suffix={
                    <>
                      <Button
                        // type="dashed"
                        onClick={showDrawer}
                        icon={<EditOutlined />}
                      ></Button>
                      <Drawer
                        title="Create a new account"
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
                            <Button
                              type="primary"
                              onClick={() => setModal2Open(true)}
                            >
                              Sumbit
                            </Button>
                            <Modal
                              title="Notification"
                              centered
                              open={modal2Open}
                              onOk={() => setModal2Open(false)}
                              onCancel={() => setModal2Open(false)}
                            >
                              <span>
                                Are you sure with the above information?
                              </span>
                            </Modal>
                          </Space>
                        }
                      >
                        <Form layout="vertical" hideRequiredMark>
                          <Col span={12}>
                            <Form.Item
                              name="name"
                              label="Password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter your Password",
                                },
                              ]}
                            >
                              <Input placeholder="Please enter Your Password" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="NewPassWord"
                              label="New Password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter New Password",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Please Enter New Password"
                              />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name="ConfirmNewPassWord"
                              label="Confirm New Password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Confirm New Password",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Please Enter Confirm New Password"
                              />
                            </Form.Item>
                          </Col>
                        </Form>
                      </Drawer>
                    </>
                  }
                />
              </Form.Item>
              <Form.Item className="submit">
                <Button type="primary" onClick={() => setModal2Open(true)}>
                  Sumbit
                </Button>
                <Modal
                  title="Notification"
                  centered
                  open={modal2Open}
                  onOk={() => setModal2Open(false)}
                  onCancel={() => setModal2Open(false)}
                >
                  <span>Are you sure with the above information?</span>
                </Modal>
              </Form.Item>
            </Form>
          </div>
        </div>
      </UserProfile>
    </>
  );
}
