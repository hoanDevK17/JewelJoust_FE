import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Select, Tag, message } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import moment from "moment";
import { APIgetallacount, APIregishaverole } from "../../api/api";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/counterSlice";

export default function Acount() {
  const token = useSelector(selectUser).token;
  // console.log(user)
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
  const [currentIdDate, setCurrentIdDate] = useState(0);
  const [form] = useForm();

  const onFinish = async (values) => {
    if (setCurrentIdDate === 0 && values.date) {
      const date = moment(values.date, "YYYY-MM-DD").format("YYYY-MM-DD");
      message.success(`Date submitted: ${date}`);
    } else {
      message.error("Please enter a valid date");
    }
    console.log("Success:", values);
    APIregishaverole(
      values.userName,
      values.passWord,
      values.fullName,
      values.email,
      values.phone,
      values.address,
      values.birthday,
      values.role,
      token
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {});
    // values.birthday = dayjs(values.birthday).format(`YYYY-MM-DD`);
    // const response = await axios.post("http://jeweljoust.online:8080/api/register", values).then((response) => {
    //     console.log(response)
    // });
    //     setData([...data, response.data]);
    //     setCurrentId(-1);
    //     console.log(response);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log(currentId);
    const currentUser = data.find((item) => {
      console.log(item);
      if (item.id == currentId) return item;
    });

    if (currentId > 0) {
      console.log(JSON.stringify(currentUser.status));
      form.setFieldsValue({
        username: currentUser.username,
        password: currentUser.password,
        fullname: currentUser.fullname,
        address: currentUser.address,
        birthday: currentUser.birthday,
        email: currentUser.email,
        phone: currentUser.phone,
        role: currentUser.role,
        status: currentUser.status,
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
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "State",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag color={status == "ACTIVE" ? "green" : "red"} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      render: (value) => (
        <Button
          onClick={() => {
            handleDelate(value);
          }}
          danger
          type="primary"
        >
          Delete
        </Button>
      ),
    },
  ];

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await APIgetallacount(token).then((response) => {
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
      `http://jeweljoust.online:8080/api/account/${value.id}`
    );
    console.log(response.data);
    // lọc ra tất cả data loại bỏ data vừa bị xoá
    setData(data.filter((data) => data.id != value.id));
  };

  const getValueProps = (value) => {
    if (currentIdDate === 0) {
      return { value: value ? value : "" };
    }
    return { value: "" };
  };
  const today = moment().format("YYYY-MM-DD");

  return (
    <div>
      <Button type="primary" onClick={() => setCurrentId(0)}>
        Add new Acount
      </Button>
      <Modal
        title={`${currentId > 0 ? "Edit" : "Add"} account`}
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
          autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input user name!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          {currentId > 0 ? (
            <></>
          ) : (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password !",
                },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input type="password" />
            </Form.Item>
          )}

          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input full name!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please input birthday!",
              },
            ]}
            getValueProps={getValueProps}
          >
            <Input type="date" max={today} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input role!",
              },
            ]}
          >
            <Select placeholder="Select Role" requiredMark="optional">
              <Select.Option value="MENBER">Menber</Select.Option>
              <Select.Option value="STAFF">Staff</Select.Option>
              <Select.Option value="MANAGER">Manage</Select.Option>
            </Select>
          </Form.Item>
          {currentId == 0 ? (
            <></>
          ) : (
            <Form.Item
              label="State"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please input state!",
                },
              ]}
            >
              <Select placeholder="Select State" requiredMark="optional">
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="LOCKED">Locked</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input phone number!",
              },
              { whitespace: true, message: "Phone don't have space" },
              {
                pattern: "[0-9]{10}",
                min: 9,
                max: 11,
                message: "Phone must contain between 9 to 11 number",
              },
            ]}
          >
            <Input type="tel" />
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
