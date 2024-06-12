import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  DatePicker,
  Select,
  Steps,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import moment from "moment";
import {
  EditOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { APIgetallrequest } from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function ManageRequest() {
  const token = useSelector(selectUser).token;
  // const dateFormat = 'YYYY/MM/DD';

  /** Manually entering any of the following formats will perform date parsing */
  // const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  // const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  // const customWeekStartEndFormat = (value) =>
  //   `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
  //     .endOf('week')
  //     .format(weekFormat)}`;

  // id >= 0
  const [currentId, setCurrentId] = useState(-1);
  const [form] = useForm();
  const [currentRequest, setCurrentRequest] = useState();
  const onFinish = async (values) => {
    console.log("Success:", values);
    values.birthday = dayjs(values.birthday).format(`YYYY-MM-DD`);
    const response = await axios.post(
      "http://jeweljoust.online:8080/api/register-have-role",
      values
    );
    setData([...data, response.data]);
    setCurrentId(-1);
    console.log(response);
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
      form.setFieldsValue({
        username: "test",
        password: "test",
        fullname: "a",
        address: "w",
        birthday: moment("04-06-2024"),
        email: "r",
        phone: "999",
        role: "q",
        locked: "o",
      });
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
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelate = (value) => {
    console.log(value);
    const response = axios.delete(
      `https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`
    );
    console.log(response.data);
    // lọc ra tất cả data loại bỏ data vừa bị xoá
    setData(data.filter((data) => data.id != value.id));
  };

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
        {currentRequest?.status != null ? (
          <>
            {" "}
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="InitialValuation"
                name="Reason"
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ flexGrow: "1" }}
                label="Reason"
                name="Reason"
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
