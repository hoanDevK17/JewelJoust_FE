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

  const [currentId, setCurrentId] = useState(-1);
  const [form] = useForm();
  const [currentRequest, setCurrentRequest] = useState();

  const [isRejected, setIsRejected] = useState(false);
  // const onFinish = async (values) => {
  //   console.log("Success:", values);
  //   form.resetFields();
  //   // values.birthday = dayjs(values.birthday).format(`YYYY-MM-DD`);
  //   // const response = await axios.post(
  //   //   "http://jeweljoust.online:8080/api/register-have-role",
  //   //   values
  //   // );
  //   // setData([...data, response.data]);
  //   setCurrentId(-1);
  //   // console.log(response);
  // };
  const onFinishrejected = async (values) => {
    APIrejectedauctionrequestsell(currentId, values.reason, token)
      .then((rs) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {});
    // setData([...data, response.data]);
    setCurrentId(-1);
    // console.log(response);
  };
  const onFinishsetappraisalprice = async (values) => {
    console.log("Success:", values);
    console.log("Success", currentId);
    // Đảm bảo rằng `currentId` và `token` không phải là `null` hoặc `undefined`
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
    // setData([...data, response.data]);
    setCurrentId(-1);
    // console.log(response);
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
      title: "Initial Price",
      dataIndex: "jewelryinitialprice",
      key: "jewelryinitialprice",
    },
    {
      title: "Ultimate Price",
      dataIndex: "ultimateValuation",
      key: "ultimateValuation",
      render: (ultimateValuation) => ultimateValuation?.price ?? "N/A",
    },

    {
      title: "Request Status",
      dataIndex: "status",
      key: "status",
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

        <Row>
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
          <Col span={12}>
            <p>
              <strong>Description:</strong> {currentRequest?.jewelrydescription}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Initial Price:</strong>{" "}
              {currentRequest?.jewelryinitialprice}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Request Date:</strong> {currentRequest?.requestdate}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Status:</strong> {currentRequest?.status}
            </p>
          </Col>
        </Row>
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
