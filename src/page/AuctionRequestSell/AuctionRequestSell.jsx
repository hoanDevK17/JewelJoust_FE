import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import uploadFile from "../../assets/hook/useUpload";
import { useForm } from "antd/es/form/Form";

import HomePage from "../../component/home-default/home.jsx";
import { APIauctionrequestsell } from "../../api/api.js";
import "./createBidRequest.scss";
import { useStyleRegister } from "antd/es/theme/internal.js";
import { useTheme } from "@emotion/react";
import { isFulfilled } from "@reduxjs/toolkit";
export default function AuctionRequestSell() {
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [urlJewelry, setUrlJewelry] = useState([]);
  const { Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const use = async (file) => {
    try {
      const imageUrl = await uploadFile(file);
      file.url = imageUrl;
      setUrlJewelry((urlJewelry) => [...urlJewelry, file]);
      messageApi.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      console.error("Upload failed:", error);
      messageApi.error(`${file.name} file upload failed.`);
    }
  };

  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
      accept: "image/png, image/jpeg, .doc, .docx, .xml, .pdf",
    },
    onChange(info) {
      use(info.file.originFileObj);
    },
  };

  const submit = (cbr) => {
    if (user != null) {
      setIsLoading(true);
      let path = urlJewelry.map((file) => ({ path: file.url }));

      APIauctionrequestsell(
        cbr.jewelryname,
        cbr.jewelrydescription,
        cbr.jewelryinitialprice,
        path
      )
        .then((rs) => {
          if (rs.status === 200) {
            message.success("Requested file was successfully");
            form.resetFields();
            setUrlJewelry([]);
          } else {
            messageApi.error(`Something went wrong`);
          }
        })
        .catch((error) => {
          messageApi.error(`Something went wrong`, error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      message.error("Please login to send request");
    }
  };

  const confirm = () => {
    form.submit();
  };

  const cancel = () => {
    message.error("Cancelled request");
  };
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  
  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };
  useEffect(() => {
    if (user == null) {
      const result = window.confirm(
        "Please login to send request Sell. Do you want to login ?"
      );

      if (result) {
        navigate("/login");
      }
    }
  });
  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#fff9e8",
            paddingTop: "50vh",
          }}
        />
      ) : (
        <HomePage>
          <div className="createBidRequest">
            <div className="body-creat-bid-request">
              <div className="content">
                <Form
                  className="form-creat-bid"
                  labelCol={{ span: 24 }}
                  onFinish={submit}
                  form={form}
                >
                  <Form.Item
                    className="input-conten"
                    label="Jewerly name"
                    name="jewelryname"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <Input
                      readOnly={user == null}
                      className="input-box"
                      type="text"
                      placeholder="Enter your Jewerly name"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Describe:"
                    name="jewelrydescription"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <TextArea
                      readOnly={user == null}
                      rows={4}
                      className="input-box"
                      type="text"
                      placeholder="Enter Describe"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Desired Price($)"
                    name="jewelryinitialprice"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <Input
                      readOnly={user == null}
                      className="input-box"
                      type="number"
                      placeholder="Enter your jewelry desired price"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Upload image of your jewelry and certificate"
                    name="imgjewerly"
                  >
                    <Upload {...props} fileList={urlJewelry}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <div
                    style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
                  >
                    {urlJewelry.map((file, index) => (
                      <Image
                        key={index}
                        width={"calc(33% - 16px)"}
                        src={file.url}
                      />
                    ))}
                  </div>
                  <Form.Item>
                    <span
                      className="Request-Sell-History AuctionRules"
                      onClick={() => toggleModal(0, true)}
                    >
                      Auction Rules
                    </span>
                    <Modal
                      style={{ marginTop: "0" }}
                      open={isModalOpen[0]}
                      onOk={() => toggleModal(0, false)}
                      onCancel={() => toggleModal(0, false)}
                      footer=" "
                      width={"fit-content"}
                    >
                      <>
                        <div className="container">
                          <h1>Auction Rules</h1>
                          <h2>1. Product Registration</h2>
                          <p>
                            1.1 Sellers must create an account and provide
                            verification information before registering a
                            product.
                          </p>
                          <p>
                            1.2 Sellers must provide detailed information about
                            the product, including:
                          </p>
                          <ul>
                            <li>Product name</li>
                            <li>Detailed description</li>
                            <li>High-quality images of the product</li>
                            <li>Legal documents of the product</li>
                            <li>Starting price</li>
                          </ul>

                          <h2>2. Auction Management</h2>
                          <p>
                            2.1 Sellers can monitor their auction requests
                            through the auction request history page.
                          </p>

                          <h2>3. Auction Conclusion</h2>
                          <p>
                            3.1 The auction ends when the auction time is over.
                          </p>
                          <p>
                            3.2 The highest bidder will be notified and must
                            make the payment within 48 hours.
                          </p>

                          <h2>4. Payment and Transaction Fees</h2>
                          <p>4.2 Sellers must pay a 2% transaction fee.</p>
                          <p>
                            4.3 Sellers will receive the money after the system
                            confirms the successful payment.
                          </p>

                          <h2>5. Additional Regulations</h2>
                          <p>
                            5.1 Users (sellers and bidders) must comply with the
                            systems rules and terms.
                          </p>
                          <p>
                            5.2 The system reserves the right to change the
                            rules and fee schedule at any time and will notify
                            users before they take effect.
                          </p>
                        </div>
                      </>
                    </Modal>
                    <Popconfirm
                      title="Confirm sell request"
                      description="Are you sure to submit this request?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Confirm"
                      cancelText="Cancel"
                    >
                      <Button
                        type="primary"
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
                        Submit
                      </Button>
                    </Popconfirm>
                    <span
                      className="Request-Sell-History"
                      onClick={() => {
                        navigate("/ActiveHistory/RequestSell");
                      }}
                    >
                      Request Sell History
                    </span>
                  </Form.Item>
                  <p style={{ color: "black" }}>
                    <Text
                      type="danger"
                      style={{ fontSize: 16 }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {user == null && " Please Sign in to request sell"}
                    </Text>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </HomePage>
      )}
    </>
  );
}
