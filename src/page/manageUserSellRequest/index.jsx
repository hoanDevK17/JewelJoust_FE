import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Steps, Row, Col } from "antd";
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
  APIgetlistrequestbyuserid,
  APIrejectedauctionrequestsell,
  APIsetappraisalprice,
} from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function ManageUserRequest() {
  const token = useSelector(selectUser).token;

  const [currentId, setCurrentId] = useState(-1);
  const [form] = useForm();
  const [currentRequest, setCurrentRequest] = useState();

  const onFinishrejected = async (values) => {
    console.log("Success:", values);
    console.log("Success:", currentId);

    APIrejectedauctionrequestsell(currentId, values.reason, token)
      .then((rs) => {
        console.log(rs);
      })
      .catch((error) => {})
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
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage(error.response?.data || "Something went wrong");
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
          if (item.id == currentId) {
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
    await APIgetlistrequestbyuserid(token).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
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
          </>
        ) : (
          <>
            <h6>Initial Valuation</h6>
            <Row>
              <Col span={12}>
                <p>
                  <strong>ID:</strong> {currentRequest?.initialValuations.id}
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
                  <strong>Reason:</strong>{" "}
                  {currentRequest?.initialValuations.reason}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Price:</strong>{" "}
                  {currentRequest?.initialValuations.price}
                </p>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
