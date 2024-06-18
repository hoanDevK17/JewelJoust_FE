import { useEffect, useState } from "react";

import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Steps,
  Row,
  Col,
  Switch,
  Tag,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import {
  EditOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  APIgetallrequest,
  APIrejectedauctionrequestsell,
  APIsetappraisalprice,
  APIshipment,
} from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { current } from "@reduxjs/toolkit";

export default function ManageRequest() {
  const token = useSelector(selectUser).token;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const [currentId, setCurrentId] = useState(-1);
  const [form] = useForm();
  const [currentRequest, setCurrentRequest] = useState();

  const [isRejected, setIsRejected] = useState(false);
  const onFinishrejected = async (values) => {
    APIrejectedauctionrequestsell(currentId, values.reason, token)
      .then((rs) => {
        console.log(rs);
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {});
    setCurrentId(-1);
  };
  const onFinishsetappraisalprice = async (values) => {
    console.log("Success:", values);
    console.log("Success", currentId);

    if (!currentId || !token) {
      console.error("Missing currentId or token");
      return;
    }
    APIsetappraisalprice(currentId, values.price, token)
      .then((rs) => {
        console.log(rs);
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {});

    setCurrentId(-1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log(currentId);
    if (currentId > 0) {
      const currentRequest = data.find((item) => {
        {
          if (item?.id == currentId) {
            console.log(item);
            return item;
          }
        }
      });
      setCurrentRequest(currentRequest);
    } else {
      form.resetFields();
    }
  }, [currentId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Jewerly Name",
      dataIndex: "jewelryname",
      key: "jewelryname",
    },
    {
      title: "Request Date",
      dataIndex: "requestdate",
      key: "requestdate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Desired Price",
      dataIndex: "jewelryinitialprice",
      key: "jewelryinitialprice",
      render: (price) => `${price}$`,
    },
    {
      title: "Initial Price",
      dataIndex: "initialValuations",
      key: "initialValuations",
      render: (initialValuations) =>
        initialValuations?.price > 0 ? `${initialValuations?.price}$` : "N/A",
    },
    {
      title: "Ultimate Price",
      dataIndex: "ultimateValuation",
      key: "ultimateValuation",
      render: (ultimateValuation) =>
        ultimateValuation?.price > 0 ? `${ultimateValuation?.price}$` : "N/A",
    },

    {
      title: "Request Status",
      dataIndex: "status",
      key: "status",
      filterMode: "tree",
      filters: [
        {
          text: "PENDING",
          value: "PENDING",
        },
        {
          text: "REJECTED",
          value: "REJECTED",
        },
        {
          text: "CONFIRMED",
          value: "CONFIRMED",
        },
        {
          text: "CANCEL",
          value: "CANCEL",
        },
        {
          text: "RECEIVED",
          value: "RECEIVED",
        },
        {
          text: "MISSED",
          value: "MISSED",
        },
        {
          text: "REVIEW",
          value: "REVIEW",
        },
        {
          text: "UNACCEPTED",
          value: "UNACCEPTED",
        },
        {
          text: "UNAPPROVED",
          value: "UNAPPROVED",
        },
        {
          text: "APPROVED",
          value: "APPROVED",
        },
        {
          text: "AGREED",
          value: "AGREED",
        },
        {
          text: "DECLINED",
          value: "DECLINED",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.status.includes(value),
      render: (text) => {
        let color = "";
        switch (text) {
          case "PENDING":
            color = "lightskyblue";
            break;
          case "REJECTED":
            color = "tomato";
            break;
          case "CONFIRMED":
            color = "limegreen";
            break;
          case "CANCEL":
            color = "gray";
            break;
          case "RECEIVED":
            color = "mediumseagreen";
            break;
          case "MISSED":
            color = "gold";
            break;
          case "REVIEW":
            color = "orange";
            break;
          case "UNACCEPTED":
            color = "orangered";
            break;
          case "UNAPPROVED":
            color = "darkorange";
            break;
          case "APPROVED":
            color = "forestgreen";
            break;
          case "AGREED":
            color = "dodgerblue";
            break;
          case "DECLINED":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Edit",
      render: (value, record) => (
        <Button
          type="primary"
          onClick={() => {
            console.log(record.id);
            setCurrentId(record.id);
          }}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await APIgetallrequest(token).then((response) => {
      setData(response.data);
    });
  };
  const handelFormPending = (checked) => {
    setIsRejected(checked);
  };
  const onFinishReceived = () => {
    console.log(currentId, token);
    APIshipment(currentId, token)
      .then((rs) => {
        console.log(rs);
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
    // setData([...data, response.data]);

    // console.log(response);
  };
  const handleUltimateValuation = async (value) => {
    APIshipment(currentId, token)
      .then((rs) => {
        console.log(rs);
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
    // setData([...data, response.data]);

    // console.log(response);
  };
  const handleUltimateValuationReject = async (value) => {
    console.log(currentId, token);
    APIshipment(currentId, token)
      .then((rs) => {
        console.log(rs);
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
    // setData([...data, response.data]);

    // console.log(response);
  };

  useEffect(() => {
    fetchData();
    console.log("oke");
  }, []);

  // const handleDelate = (value) => {
  //   console.log(value);
  //   const response = axios.delete(
  //     `https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`
  //   );
  //   console.log(response.data);
  //   // lọc ra tất cả data loại bỏ data vừa bị xoá
  //   setData(data.filter((data) => data.id != value.id));
  // };

  return (
    <div>
      <Modal
        title={`${currentId > 0 ? "Edit" : "Add"} request`}
        open={currentId >= 0}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setCurrentId(-1);
        }}
      >
        <Steps
          items={[
            {
              title: "Login",
              status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: "Pay",
              status: "process",
              icon: <LoadingOutlined />,
            },
            {
              title: "Done",
              status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff", // Màu nền
            marginBottom: "10px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <p>
                    <strong>ID:</strong> {currentRequest?.id}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Name:</strong> {currentRequest?.jewelryname}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col
              span={24}
              style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
            >
              <Row gutter={[16, 16]} style={{ paddingTop: "10px" }}>
                <Col span={23}>
                  <p>
                    <strong>Request Date: </strong>{" "}
                    {formatDate(currentRequest?.requestdate)}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col
              span={24}
              style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
            >
              <Row gutter={[16, 16]} style={{ paddingTop: "10px" }}>
                <Col span={12}>
                  <p>
                    <strong>Initial Price:</strong>{" "}
                    {currentRequest?.jewelryinitialprice}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Status:</strong> {currentRequest?.status}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col
              span={24}
              style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
            >
              <Row gutter={[16, 16]} style={{ paddingTop: "10px" }}>
                <Col span={24}>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {currentRequest?.jewelrydescription}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {currentRequest?.status === "PENDING" ? (
          <>
            <Switch
              unCheckedChildren="Valuation"
              checkedChildren="Reject"
              onChange={handelFormPending}
            />
            {isRejected ? (
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  display: "flex",
                  gap: "16px",
                  justifyContent: "space-between",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishrejected}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ flexGrow: "1" }}
                  label="Reason"
                  name="reason"
                  rules={[
                    {
                      required: true,
                      message: "Please input Reason !",
                    },
                    { whitespace: true },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Reject
                </Button>
              </Form>
            ) : (
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  display: "flex",
                  gap: "16px",
                  justifyContent: "space-between",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishsetappraisalprice}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="InitialValuation"
                  name="price"
                  style={{ flexGrow: "1" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input InitialValuation !",
                    },
                    { whitespace: true },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Valuation
                </Button>
              </Form>
            )}
          </>
        ) : (
          <>
            <Row>
              {currentRequest?.status === "CONFIRMED" ? (
                <>
                  <h6>Initial Valuation</h6>
                  <Col span={12}>
                    <p>
                      <strong>ID:</strong>{" "}
                      {currentRequest?.initialValuations.id}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Date:</strong>{" "}
                      {currentRequest?.initialValuations.initialdate}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Status:</strong>{" "}
                      {currentRequest?.initialValuations.status}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Price:</strong>{" "}
                      {currentRequest?.initialValuations.price}
                    </p>
                  </Col>
                </>
              ) : (
                <>
                  {currentRequest?.status === "REJECTED" ? (
                    <Col span={12}>
                      <p>
                        <strong>Reason:</strong>{" "}
                        {currentRequest?.initialValuations.reason}
                      </p>
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Row>
          </>
        )}
        {currentRequest?.status === "CONFIRMED" ? (
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              display: "flex",
              gap: "16px",
              justifyContent: "space-between",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishReceived}
            autoComplete="off"
          >
            <Button type="primary" htmlType="submit">
              Received
            </Button>
          </Form>
        ) : (
          <></>
        )}

        {currentRequest?.status === "RECEIVED" ? (
          <>
            <Switch
              unCheckedChildren="Valuation"
              checkedChildren="Reject"
              onChange={handelFormPending}
            />
            {isRejected ? (
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  display: "flex",
                  gap: "16px",
                  justifyContent: "space-between",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleUltimateValuationReject}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ flexGrow: "1" }}
                  label="Reason"
                  name="reason"
                  rules={[
                    {
                      required: true,
                      message: "Please input Reason !",
                    },
                    { whitespace: true },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Reject
                </Button>
              </Form>
            ) : (
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  display: "flex",
                  gap: "16px",
                  justifyContent: "space-between",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleUltimateValuation}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="UltimateValuation"
                  name="price"
                  style={{ flexGrow: "1" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input UltimateValuation !",
                    },
                    { whitespace: true },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Valuation
                </Button>
              </Form>
            )}
          </>
        ) : (
          <>
            <Row>
              {currentRequest?.status === "CONFIRMED" ? (
                <>
                  <h6>Initial Valuation</h6>
                  <Col span={12}>
                    <p>
                      <strong>ID:</strong>{" "}
                      {currentRequest?.initialValuations.id}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Date:</strong>{" "}
                      {currentRequest?.initialValuations.initialdate}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Status:</strong>{" "}
                      {currentRequest?.initialValuations.status}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>Price:</strong>{" "}
                      {currentRequest?.initialValuations.price}
                    </p>
                  </Col>
                </>
              ) : (
                <>
                  {currentRequest?.status === "REJECTED" ? (
                    <Col span={12}>
                      <p>
                        <strong>Reason:</strong>{" "}
                        {currentRequest?.initialValuations.reason}
                      </p>
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Row>
          </>
        )}
      </Modal>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
