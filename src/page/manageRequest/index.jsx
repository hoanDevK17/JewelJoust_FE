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
  Image,
  message,
} from "antd";

import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  APIAcceptUltimate,
  APIRejectUltimate,
  APIgetallrequest,
  APIrejectedauctionrequestsell,
  APIsetappraisalprice,
  APIshipment,
  APIultimateValuations,
  APIultimateValuationsReject,
} from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function ManageRequest() {
  const token = useSelector(selectUser)?.token;

  // set format cho date
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
  const [data, setData] = useState([]);
  const [form] = useForm();
  const [currentRequest, setCurrentRequest] = useState();
  const [isRejected, setIsRejected] = useState(false);
  const user = useSelector(selectUser);

  const onFinishrejected = async (values) => {
    APIrejectedauctionrequestsell(currentId, values.reason, token)
      .then((response) => {
        if (response.status == 200) {
          message.success("Successfully");
        }
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {});
    setCurrentId(-1);
  };
  const onFinishsetappraisalprice = async (values) => {
    if (!currentId || !token) {
      console.error("Missing currentId or token");
      return;
    }
    APIsetappraisalprice(currentId, values.price, token)
      .then((response) => {
        if (response.status == 200) {
          message.success("Successfully");
        }
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

  const fetchData = async () => {
    await APIgetallrequest(token).then((response) => {
      if (response.status == 200) {
        setData(response.data);
      }
    });
  };

  const handelFormPending = (checked) => {
    setIsRejected(checked);
  };

  const onFinishReceived = () => {
    APIshipment(currentId)
      .then(() => {
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const handleUltimateValuation = async (value) => {
    APIultimateValuations(currentId, value.price, token)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const handleUltimateValuationReject = async (value) => {
    APIultimateValuationsReject(currentId, value.reason, token)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };
  const handleAcceptUltimateValuation = async () => {
    APIAcceptUltimate(currentId, token)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error?.data);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };
  const handleRejectUltimateValuation = async (value) => {
    console.log(value);
    APIRejectUltimate(currentId, value.reason, token)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const renderSteps = (status) => {
    return (
      <Steps current={0}>
        <Steps.Step
          title="Initial Valuation"
          status={getStatusForStep("Initial Valuation", status)}
          icon={getIconForStep("Initial Valuation", status)}
        />
        <Steps.Step
          title="Delivery"
          status={getStatusForStep("Delivery", status)}
          icon={getIconForStep("Delivery", status)}
        />
        <Steps.Step
          title="Pricing Phase"
          status={getStatusForStep("Pricing Phase", status)}
          icon={getIconForStep("Pricing Phase", status)}
        />
        <Steps.Step
          title="Done"
          status={getStatusForStep("Done", status)}
          icon={getIconForStep("Done", status)}
        />
      </Steps>
    );
  };

  //lấy status từ Status
  const getStatusForStep = (title, status) => {
    switch (title) {
      case "Initial Valuation":
        switch (status) {
          case "PENDING":
            return "process";
          case "REJECTED":
          case "CANCEL":
            return "error";
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "finish";
          default:
            return "finish";
        }
      case "Delivery":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
            return "wait";
          case "CONFIRMED":
            return "process";
          case "RECEIVED":
            return "finish";
          case "MISSED":
            return "error";
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "finish";
          default:
            return "wait";
        }
      case "Pricing Phase":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "MISSED":
            return "wait";
          case "RECEIVED":
          case "REVIEW":
            return "process";
          case "UNACCEPTED":
          case "UNAPPROVED":
            return "error";
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "finish";
          default:
            return "wait";
        }
      case "Done":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
            return "wait";
          case "APPROVED":
            return "process";
          case "AGREED":
            return "finish";
          case "DECLINED":
            return "error";
          default:
            return "wait";
        }
      default:
        return "wait";
    }
  };

  // lấy icon từ Status
  const getIconForStep = (title, status) => {
    switch (title) {
      case "Initial Valuation":
        switch (status) {
          case "PENDING":
            return <LoadingOutlined />;
          case "REJECTED":
          case "CANCEL":
            return <CloseCircleOutlined />;
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <CheckCircleOutlined />;
        }
      case "Delivery":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
            return <ClockCircleOutlined />;
          case "CONFIRMED":
            return <LoadingOutlined />;
          case "RECEIVED":
            return <CheckCircleOutlined />;
          case "MISSED":
            return <CloseCircleOutlined />;
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <CheckCircleOutlined />;
        }
      case "Pricing Phase":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "MISSED":
            return <ClockCircleOutlined />;
          case "RECEIVED":
          case "REVIEW":
            return <LoadingOutlined />;
          case "UNACCEPTED":
          case "UNAPPROVED":
            return <CloseCircleOutlined />;
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <ClockCircleOutlined />;
        }
      case "Done":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
            return <ClockCircleOutlined />;
          case "APPROVED":
            return <LoadingOutlined />;
          case "AGREED":
            return <CheckCircleOutlined />;
          case "DECLINED":
            return <CloseCircleOutlined />;
          default:
            return <ClockCircleOutlined />;
        }
      default:
        return <ClockCircleOutlined />;
    }
  };
  useEffect(() => {
    fetchData();
    console.log("oke");
  }, []);
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
  return (
    <>
      <div>
        <Modal
          width={850}
          title={`${currentId > 0 ? "Edit" : "Add"} request`}
          open={currentId >= 0}
          onOk={() => setCurrentId(-1)}
          onCancel={() => {
            form.resetFields();
            setCurrentId(-1);
          }}
        >
          <div>{renderSteps(currentRequest?.status)}</div>
          <h5>Sell request: </h5>
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
            <Row gutter={[0, 0]}>
              <Col span={24}>
                <Row gutter={[0, 0]}>
                  <Col span={8}>
                    <p>
                      <strong>ID Request:</strong> {currentRequest?.id}
                    </p>
                  </Col>

                  <Col span={8}>
                    <p>
                      <strong>Status:</strong> {currentRequest?.status}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Desired Price: </strong>$
                      {currentRequest?.jewelryinitialprice}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col
                span={24}
                style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
              >
                <Row gutter={[0, 0]} style={{ paddingTop: "10px" }}>
                  <Col span={12}>
                    <p>
                      <strong>Request Date: </strong>
                      {formatDate(currentRequest?.requestdate)}
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
                <Row gutter={[0, 0]} style={{ paddingTop: "10px" }}>
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
                <Row>
                  {currentRequest?.resources?.map((img) => (
                    <>
                      <Image
                        src={img.path}
                        width={"calc(33% - 16px)"}
                        style={{
                          padding: "10px",
                        }}
                      />
                    </>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
          {currentRequest?.status === "PENDING" && (
            <>
              <Row>
                <h6 style={{ marginRight: "12px" }}>Valuation</h6>
                {user?.role === "STAFF" ? (
                  <Switch
                    unCheckedChildren="Reject"
                    checkedChildren="Valuation"
                    onChange={handelFormPending}
                  />
                ) : (
                  <Switch
                    unCheckedChildren="Reject"
                    checkedChildren="Valuation"
                    disabled
                  />
                )}
              </Row>
              {!isRejected ? (
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    maxWidth: 500,
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
                    <Input readOnly={user?.role !== "STAFF"} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={user?.role !== "STAFF"}>
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
                    display: "flex",
                    gap: "16px",
                    maxWidth: 600,
                    justifyContent: "center",
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
                    <Input readOnly={user?.role !== "STAFF"} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={user?.role !== "STAFF"}>
                    Valuation
                  </Button>
                </Form>
              )}
            </>
          )}
          {currentRequest?.initialValuations != null && (
            <>
              <h5>Initial Valuation:</h5>
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
                <Row>
                  <Col span={24}>
                    <Row gutter={[0, 0]}>
                      <Col span={8}>
                        <p>
                          <strong>Date: </strong>
                          {formatDate(
                            currentRequest?.initialValuations.initialdate
                          )}
                        </p>
                      </Col>
                      <Col span={8}>
                        <p>
                          <strong>Status: </strong>
                          {currentRequest?.initialValuations.status}
                        </p>
                      </Col>
                      <Col span={8}>
                        <p>
                          <strong>Price: </strong>
                          {currentRequest?.initialValuations.price}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </>
          )}

          {currentRequest?.status === "REJECTED" && (
            <Col span={12}>
              <div
                style={{
                  width: "800px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff", // Màu nền
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Reason: </strong>
                  {currentRequest?.reasonReject}
                </p>
              </div>
            </Col>
          )}

          {currentRequest?.status === "UNAPPROVED" && (
            <Col span={12}>
              <div
                style={{
                  width: "100%",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff", // Màu nền
                  marginBottom: "10px",
                }}
              >
                <Col>
                  <p>
                    <strong>Price:</strong>
                    {currentRequest?.ultimateValuation.reason}
                  </p>
                </Col>
              </div>
            </Col>
          )}

          {currentRequest?.status === "CONFIRMED" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
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
                <Button type="primary" htmlType="submit" disabled={user?.role !== "STAFF"}>
                  Received
                </Button>
              </Form>
            </div>
          )}

          {currentRequest?.status === "RECEIVED" && (
            <>
              <Switch
                unCheckedChildren="Valuation"
                checkedChildren="Reject"
                onChange={handelFormPending}
                disabled={user?.role !== "STAFF"}
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
                    <Input disabled={user?.role !== "STAFF"} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={user?.role !== "STAFF"}>
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
                    <Input disabled={user?.role !== "STAFF"} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={user?.role !== "STAFF"}>
                    Valuation
                  </Button>
                </Form>
              )}
            </>
          )}


          {currentRequest?.ultimateValuation && (
            <>
              <h5>Ultimate Valuation:</h5>
              <Row>
                {currentRequest?.status == "UNACCEPTED" ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff", // Màu nền
                        marginBottom: "10px",
                      }}
                    >
                      <p>
                        <strong>Reason: </strong>
                        {currentRequest?.ultimateValuation.reason}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff", // Màu nền
                        marginBottom: "10px",
                      }}
                    >
                      <Col>
                        <p>
                          <strong>Price:</strong>
                          {currentRequest?.ultimateValuation.price}
                        </p>
                      </Col>
                    </div>
                    {currentRequest?.status === "REVIEW" && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                          }}
                        >
                          <h6 style={{ marginRight: "12px" }}>Review</h6>
                          <Switch
                            unCheckedChildren="Reject"
                            checkedChildren="Accept"
                            onChange={handelFormPending}
                            disabled={user?.role !== "MANAGER"}
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "16px",
                          }}
                        >
                          {!isRejected ? (
                            <Form
                              name="basic"
                              labelCol={{
                                span: 8,
                              }}
                              wrapperCol={{
                                span: 16,
                              }}
                              style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "center",
                                maxWidth: 600,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={handleRejectUltimateValuation}
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
                                    message: "Please input Reason!",
                                  },
                                  { whitespace: true },
                                ]}
                                hasFeedback
                              >
                                <Input disabled={user?.role !== "MANAGER"} />
                              </Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={user?.role !== "MANAGER"}
                              >
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
                                display: "flex",
                                gap: "16px",
                                justifyContent: "center",
                                maxWidth: 500,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={handleAcceptUltimateValuation}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={user?.role !== "MANAGER"}
                              >
                                Accept
                              </Button>
                            </Form>
                          )}
                        </div>
                      </>
                    )}              
                  </>
                )}
              </Row>
            </>
          )}
        </Modal>
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
}
