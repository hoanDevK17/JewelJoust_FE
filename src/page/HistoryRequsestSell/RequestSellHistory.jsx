import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  message,
  Modal,
  Row,
  Spin,
  Steps,
  Switch,
  Table,
  Tag,
} from "antd";

import {
  APIAuctionConfirmation,
  APIAuctionRejected,
  APIgetallrequest,
  APIgetallrequestUser,
} from "../../api/api";
import dayjs from "dayjs";
import "./index.scss";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
const pageSize = 7;
// tạo ra timeline
// in ra step
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

const columns = (setCurrentId) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 1,
    },
  },
  {
    title: "Name",
    dataIndex: "jewelryname",
    key: "jewelryname",
  },
  {
    title: "CreatedDate",
    dataIndex: "requestdate",
    key: "requestdate",
    render: (requestdate) => dayjs(requestdate).format("HH:mm DD/MM/YYYY "),
  },
  {
    title: "Desired Price",
    dataIndex: "jewelryinitialprice",
    key: "jewelryinitialprice",
    render: (price) => `${price}$`,
    sorter: {
      compare: (a, b) => a.jewelryinitialprice - b.jewelryinitialprice,
      multiple: 2,
    },
  },
  {
    title: "Initial Price",
    dataIndex: "initialValuations",
    key: "initialValuations",
    render: (initialValuations) =>
      initialValuations?.price > 0 ? `${initialValuations?.price}$` : "N/A",
    sorter: {
      compare: (a, b) =>
        a.initialValuations?.price - b.initialValuations?.price,
      multiple: 3,
    },
  },
  {
    title: "Ultimate Price",
    dataIndex: "ultimateValuation",
    key: "ultimateValuation",
    render: (ultimateValuation) =>
      ultimateValuation?.price > 0 ? `${ultimateValuation?.price}$` : "N/A",
    sorter: {
      compare: (a, b) =>
        a.ultimateValuation?.price - b.ultimateValuation?.price,
      multiple: 3,
    },
  },
  {
    title: "status",
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
          setCurrentId(record.id);
        }}
      >
        <EditOutlined />
      </Button>
    ),
  },
];

function RequestSellHistory() {
  const [data, setData] = useState();
  const [currentId, setCurrentId] = useState(-1);
  const [currentRequest, setCurrentRequest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [page, setPage] = useState(1);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await APIgetallrequest(page, pageSize, "id,desc")
      .then((response) => {
        console.log(response);
        setData(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handelFormPending = (checked) => {
    setIsRejected(checked);
  };

  const handelAutionComfirmation = async (value) => {
    APIAuctionConfirmation(currentId)
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

  const handelAutionRejected = async (value) => {
    APIAuctionRejected(currentId)
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

  useEffect(() => {
    if (currentId > 0) {
      setCurrentRequest(data.find((request) => request.id === currentId));
    }
  }, [currentId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",
            //  backgroundColor: "#fff9e8",
            paddingTop: "50vh",
          }}
        ></Spin>
      ) : (
        <>
          <Modal
            width={670}
            title={`Detail Information`}
            open={currentId >= 0}
            onCancel={() => {
              setCurrentId(-1);
            }}
            onOk={() => {
              setCurrentId(-1);
            }}
          >
            <div>{renderSteps(currentRequest?.status)}</div>
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
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Date: </strong>
                            {formatDate(
                              currentRequest?.initialValuations.initialdate
                            )}
                          </p>
                        </Col>
                        <Col span={8}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Status: </strong>
                            {currentRequest?.initialValuations.status}
                          </p>
                        </Col>
                        <Col span={8}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
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
            {currentRequest?.ultimateValuation != null && (
              <>
                <h5>Ultimate Valuation:</h5>
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
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Date: </strong>
                            {formatDate(
                              currentRequest?.ultimateValuation.ultimatedate
                            )}
                          </p>
                        </Col>
                        <Col span={8}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Status: </strong>
                            {currentRequest?.ultimateValuation.status}
                          </p>
                        </Col>
                        <Col span={8}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Price: </strong>
                            {currentRequest?.ultimateValuation.price}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </>
            )}
            {currentRequest?.reasonReject != null && (
              <>
                <h5>Reason Reject:</h5>
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
                        <Col span={24}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <strong>Reason: </strong>
                            {currentRequest?.reasonReject}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </>
            )}
            {currentRequest?.status == "APPROVED" && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <h6 style={{ marginRight: "12px" }}>CONFIRMED</h6>
                  <Switch
                    unCheckedChildren="Accept"
                    checkedChildren="Reject"
                    onChange={handelFormPending}
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
                        maxWidth: 500,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={handelAutionComfirmation}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Button type="primary" htmlType="submit">
                        Accept
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
                      onFinish={handelAutionRejected}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Button type="primary" htmlType="submit">
                        Rejected
                      </Button>
                    </Form>
                  )}
                </div>
              </>
            )}
          </Modal>

          <Table columns={columns(setCurrentId)} dataSource={data} />
        </>
      )}
    </>
  );
}

export default RequestSellHistory;
