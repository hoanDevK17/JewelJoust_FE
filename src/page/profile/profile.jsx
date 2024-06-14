import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Upload,
  message,
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
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/counterSlice.js";
import { useForm } from "antd/es/form/Form.js";
import { APIUpdateProfile } from "../../api/api.js";

export default function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
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

  // edit password
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // confirm edit
  // const [modal2Open, setModal2Open] = useState(false);  
  const handleUpdateProfile = (profile) => {
    console.log(profile)
    APIUpdateProfile(profile,user.token,user.id).then((rs)=>{
   if(rs.status===200){
       // console.log(rs);
       rs.data.token = user.token;
       // console.log(rs);
       dispatch(login(rs.data)); messageApi.open({
        type: 'success',
        content: 'Update Profile Successfully',
      });
   }

      
    }).catch((error)=>{
      messageApi.open({
        type: 'error',
        content: 'Update Profile Error',
      });
    })
  };

  // const [form] = Form.useForm();

  const handleChangePass = (values) => {
    console.log("Form values: ", values);
  };
  // const form = useForm();
  // form.setFieldsValue("fullname",user?.fullname)
  
  return (
    <>
      <UserProfile> {contextHolder}
        <div className="profile">
          <div className="Avatar">
            <>
              <ImgCrop rotationSlider>
                <Upload
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
            // form={form}
              style={{
                width: 600,
              }}
              onFinish={handleUpdateProfile}
            >
              <Form.Item className="Form" name="fullname" label="Name"  initialValue ={user?.fullname} >
                <Input
                  size="large"
                 
                  placeholder="   Enter your infomation"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form" name="email" label="Email"    initialValue ={user?.email}>
                <Input
                  size="large"
                  name="email"
               
                  placeholder="   Enter your infomation"
                  prefix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form" name="phone" label="Phone" rules={[
                {
                  required: true,
                  message: 'This box cannot be left blank',
                
                },{
                  pattern:"[0-9]{10}",
                  message: 'Must 10 number', 
                }]}      
                initialValue ={user?.phone}>
                <Input
                  name="phone"
                  size="large"
                  type="tel"
            
                  placeholder="   Enter your infomation"
                  prefix={<PhoneOutlined />}
                  
                />
              </Form.Item>
              <Form.Item className="Form" name="birthday" label="Birthday"
               rules={[{
                required:true,
                message:"This box cannot be left blank"
              }]}       initialValue ={user?.birthday?.substring(0,10)}>
                <Input
                  size="large"type="date"
           
                  placeholder="  Enter your infomation"
                  prefix={<GiftOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form" name="address" label="Address" rules={[{
                required:true,
                message:"This box cannot be left blank"
              }     ]}           initialValue ={user?.address}>
                <Input
                  size="large"
                  name="birthday"
       
                  placeholder="   Enter your infomation"
                  prefix={<EnvironmentOutlined />}
                />
              </Form.Item>
              <Form.Item className="Form" label="Password"            initialValue ={"\t" + "************"}>
                <Input
                  disabled
                  size="large"
                  name="password"
       
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
                          </Space>
                        }
                      >
                        <Form
                          // form={form}
                          layout="vertical"
                          hideRequiredMark
                          onFinish={handleChangePass}
                        >
                          <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter your Password",
                              },
                            ]}
                          >
                            <Input.Password placeholder="Please enter your Password" />
                          </Form.Item>

                          <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter New Password",
                              },
                              {
                                min: 4,
                                message:
                                  "New password must be at least 4 characters long",
                              },
                            ]}
                          >
                            <Input.Password placeholder="Please Enter New Password" />
                          </Form.Item>

                          <Form.Item
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            dependencies={["newPassword"]}
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Confirm New Password",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("newPassword") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      "The two passwords that you entered do not match!"
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password placeholder="Please Enter Confirm New Password" />
                          </Form.Item>

                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>

                            {/* <button type="submit"></button> */}
                          </Form.Item>
                        </Form>
                      </Drawer>
                    </>
                  }
                />
              </Form.Item>
              <Form.Item className="submit">
                <Button
                  type="primary"
                  htmlType="sumbit"

                  // onClick={() => setModal2Open(true)}
                >
                  Sumbit
                </Button>
              </Form.Item>

              {/* <button type="submit"></button> */}

              {/* <Modal
                title="Notification"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
              >
                <span>Are you sure with the above information?</span>
              </Modal> */}
            </Form>
          </div>
        </div>
      </UserProfile>
    </>
  );
}
