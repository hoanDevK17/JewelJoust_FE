import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import "./createBidRequest.scss";
import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

export default function AuctionRequestSell() {
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
      accept: "image/png, image/jpeg, .doc, .docx, .xml, .pdf",
    },
    onChange(info) {
      ``;
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const submit = (cbr) => {
    console.log(cbr);
    setIsLoading(true);
    APIcbr(
      cbr.jewerlyname,
      cbr.describe,
      cbr.jewelryinitialprice,
      cbr.imgjewerly,
      cbr.filejewerly
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
        <HomePage>
          <div className="createBidRequest">
            <div className="body-creat-bid-request">
              <div className="content">
                <Form
                  className="form-creat-bid"
                  labelCol={{
                    span: 24,
                  }}
                  onFinish={submit}
                >
                  <Form.Item
                    className="input-conten"
                    label="Jewerly name"
                    name="jewerlyname"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <Input
                      className="input-box"
                      type="text"
                      placeholder=" Enter your Jewerly name"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Describe:"
                    name="describe"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      className="input-box"
                      type="text"
                      placeholder=" Enter Describe"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Jewelry Initial Price:"
                    name="jewelryinitialprice"
                    rules={[
                      {
                        required: true,
                        message: "This box cannot be left blank",
                      },
                    ]}
                  >
                    <Input
                      className="input-box"
                      type="number"
                      placeholder=" Enter your jewelry initial price"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Upload image of your jewelry"
                    name="imgjewerly"
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Upload the certificate files of your jewelry"
                    name="filejewerly"
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {errorMessage ? errorMessage : ""}
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
                      Submis
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <Footer />
          </div>
        </HomePage>
      )}
    </>
  );
}
