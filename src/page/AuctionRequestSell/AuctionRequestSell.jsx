import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import "./createBidRequest.scss";
import {
  Button,
  Form,
  Image,
  Input,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { APIauctionrequestsell } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice.js";
import uploadFile from "../../assets/hook/useUpload.js";
import { useForm } from "antd/es/form/Form.js";

export default function AuctionRequestSell() {
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Sử dụng hook useNavigate từ react-router-dom
  const token = useSelector(selectUser)?.token;
  const [urlJewelry, setUrlJewelry] = useState([]);
  const { Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const use = async (file) => {
    try {
      console.log("oke", file);
      const imageUrl = await uploadFile(file);
      // setUrl((prevUrl) => [...prevUrl, { path: imageUrl }]);
      // setUrl({
      //   uid: "-1",
      //   name: "image.png",
      //   status: "done",
      //   url: imageUrl,
      // });
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
    setIsLoading(true);
    console.log(urlJewelry);
    var path = [];
    urlJewelry.forEach((file) => {
      path = [...path, { path: file.url }];
    });
    console.log(path);
    APIauctionrequestsell(
      cbr.jewelryname,
      cbr.jewelrydescription,
      cbr.jewelryinitialprice,
      path,
      token
    )
      .then((rs) => {
        console.log("Full response:", rs);
        if (rs.status === 200) {
          message.success("Requested file was successfully");
          console.log("oke");
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
  };

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
                      className="input-box"
                      type="number"
                      placeholder="Enter your jewelry desired price"
                      rules={[
                        {
                          required: true,
                          message: "This box cannot be left blank",
                        },
                      ]}
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
                    {urlJewelry?.map((file, index) => {
                      return (
                        <Image
                          key={index}
                          width={"calc(33% - 16px)"}
                          src={file.url}
                        />
                      );
                    })}
                  </div>
                  {/* <Form.Item
                    className="input-conten"
                    label="Upload the certificate files of your jewelry"
                    name="filejewerly"
                  >
                    <Upload {...props} listType="picture" fileList={url}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item> */}
                  <p
                    style={{
                      color: "red",
                    }}
                  ></p>
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
                      Submit
                    </Button>
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
                    {" "}
                    <Text
                      type="danger"
                      style={{ fontSize: 16 }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {" "}
                      {token == null && " Please Sign in to request sell"}
                    </Text>
                  </p>
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
