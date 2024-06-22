import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Select, message } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import {
  APIcreateSession,
  APIgetallSession,
  APIgetallacount,
  APIgetallrequest,
} from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { Option } from "antd/es/mentions";
import { Ls } from "dayjs";

export default function ManageSession() {
  const token = useSelector(selectUser)?.token;
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
  const [requestAuctions, setRequestAuctions] = useState([]);

  const onFinish = async (values) => {
    APIcreateSession(values, token)
      .then((response) => {
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      })
      .finally(() => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    fetchAuctionRequest();
    fetchStaff();
    if (currentId > 0) {
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
      title: "Name Session",
      dataIndex: "nameSession",
      key: "nameSession",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Name Jewelry",
      dataIndex: "nameJewelry",
      key: "nameJewelry",
    },
    {
      title: "Initial Price",
      dataIndex: "initialPrice",
      key: "initialPrice",
    },
    {
      title: "Min Step Price",
      dataIndex: "minStepPrice",
      key: "minStepPrice",
    },
    {
      title: "Status",
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
  const [staffs, setStaffs] = useState([]);
  const fetchData = async () => {
    APIgetallSession(token).then((response) => {
      setData(response.data);
    });
  };
  const fetchAuctionRequest = async () => {
    APIgetallrequest(token).then((response) => {
      setRequestAuctions(response.data);
    });
  };
  const fetchStaff = async () => {
    APIgetallacount(token).then((response) => {
      var optionStaff = [];
      response.data.forEach((account) => {
        if (account.role == "STAFF") {
          optionStaff = [
            ...optionStaff,
            { value: account.id, label: `${account.id}. ${account.username}` },
          ];
        }
      });

      setStaffs(optionStaff);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={() => setCurrentId(0)}>
        Add new Session
      </Button>
      <Modal
        title={`${currentId > 0 ? "Edit" : "Add"} Session`}
        open={currentId >= 0}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setCurrentId(-1);
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={() => {
            form.validateFields(["startDateTime", "endDateTime"]);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name Session"
            name="name_session"
            rules={[
              {
                required: true,
                message: "Please input name session!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Jewerly Name"
            name="name_jewelry"
            rules={[
              {
                required: true,
                message: "Please input jewerly name!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input Description !",
              },
              { whitespace: true },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Auction Request"
            name="id_auction_request"
            rules={[
              {
                required: true,
                message: "Please input initial price!",
              },
            ]}
          >
            <Select placeholder="Auction RequestID" allowClear showSearch>
              {/* {requestAuctions?.map((request) => {
                console.log("a");
                return (
                  <>
                  
                  </>
                );
              })} */}
              {requestAuctions?.map((request, index) => {
                return (
                  <Option key={index} value={request.id}>
                    {request.jewelryname} - {request.ultimateValuation?.price}$
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Min Step Price"
            name="min_stepPrice"
            rules={[
              {
                required: true,
                message: "Please input min step price!",
              },
              { whitespace: true },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Deposit Amount"
            name="deposit_amount"
            rules={[
              {
                required: true,
                message: "Please input Deposit Amount!",
              },
              { whitespace: true },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Fee Amount"
            name="fee_amount"
            rules={[
              {
                required: true,
                message: "Please input Fee Amount!",
              },
              { whitespace: true },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Staff"
            name="staff_id"
            rules={[
              {
                required: true,
                message: "Please input Staff ID!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              filterOption={(input, staff) => {
                console.log(staff);
                return (staff?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              options={staffs}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="start_time"
            rules={[
              {
                required: true,
                message: "Please input Start Time!",
              },
              { whitespace: true },
              {
                pattern:
                  /^202[0-9]-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1])) (([0-1][0-9])|(2[0-3])):([0-5][0-9])$/,
                message: "Invalid date format! (YYYY-MM-DD HH:mm)",
              },
            ]}
          >
            <Input placeholder="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="end_time"
            rules={[
              {
                required: true,
                message: "Please input End Time!",
              },
              { whitespace: true },
              {
                pattern:
                  /^202[0-9]-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1])) (([0-1][0-9])|(2[0-3])):([0-5][0-9])$/,
                message: "Invalid date format! (YYYY-MM-DD HH:mm)",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue("start_time")) {
                    return Promise.resolve();
                  }
                  const start = moment(
                    getFieldValue("start_time"),
                    "YYYY-MM-DD HH:mm"
                  );
                  const end = moment(value, "YYYY-MM-DD HH:mm");
                  if (end.isBefore(start)) {
                    return Promise.reject(
                      new Error(
                        "The end date and time must be after the start date"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
