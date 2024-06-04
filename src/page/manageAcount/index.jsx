import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, DatePicker } from 'antd';
import axios from "axios";
import { useForm } from "antd/es/form/Form";

export default function Acount() {

    // id >= 0
    const [currentId, setCurrentId] = useState(-1)
    const [form] = useForm()

    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await axios.post("https://665d6f09e88051d604068e77.mockapi.io/category", values);
            setData([...data, response.data]);
            setCurrentId(-1);
            console.log(response);
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      useEffect(() => {
        console.log(currentId);
        if(currentId > 0){
            form.setFieldsValue({
                username: 'test',
                password: 'test',
                fullname: 'a',
                address: 'w',
                birthday: "e",
                email: 'r',
                phone: '999',
                role: 'q',
                locked: 'o'
            })
        }else{
            form.resetFields()
        }
      }, [currentId])
      
    const columns = [
        {
          title: 'ID',
          dataIndex: 'userid',
          key: 'userid',
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
          {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
          },
          {
            title: 'State',
            dataIndex: 'locked',
            key: 'locked',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
        {
            title: 'Edit',
                render: (value, record) => (
                    <Button type="primary" onClick={() => {
                        console.log(record.id);
                        setCurrentId(record.id)
                    }}>
                        Edit
                    </Button>
                )
        },
        {
            title: 'Delete',
            render: (value) => (
                <Button onClick={ () => {
                    handleDelate(value)
                }} danger type="primary">
                    Delete
                </Button>
            )
        }
    ];

const [data, setData] = useState ([]);

const fetchData = async () => {
    const response = await axios.get("https://665d6f09e88051d604068e77.mockapi.io/category");
    console.log(response.data); 
    setData(response.data);
};

    useEffect(() => {
    fetchData();
}, []);

const handleDelate = (value) =>{
    console.log(value);
    const response = axios.delete(
        `https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`
    );
    // lọc ra tất cả data loại bỏ data vừa bị xoá
    setData(data.filter((data) => data.id != value.id));
};
const onChangeSetDate = (date, dateString) => {
    console.log(date, dateString);
  };


return (
<div>
     <Button type="primary" onClick={() => setCurrentId(0)}>
    Add new Acount
  </Button>
  <Modal title={`${currentId > 0 ? 'Edit': 'Add'} account`} open={currentId >= 0 } onOk={() => form.submit()} onCancel={() => {
    form.resetFields()
    setCurrentId(-1)
  }}>
    
    
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
        message: 'Please input user name!',
        },
    ]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Password"
    name="password"
    rules={[
        {
        required: true,
        message: 'Please input password !',
        },
    ]}
    >
    <Input type="password"/>
    </Form.Item>

    <Form.Item
    label="Full Name"
    name="fullname"
    rules={[
        {
        required: true,
        message: 'Please input full name!',
        },
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
        message: 'Please input address!',
        },
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
        message: 'Please input birthday!',
        },
    ]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Role"
    name="role"
    rules={[
        {
        required: true,
        message: 'Please input role!',
        },
    ]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="State"
    name="locked"
    rules={[
        {
        required: true,
        message: 'Please input state!',
        },
    ]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Email"
    name="email"
    rules={[
        {
        required: true,
        message: 'Please input email!',
        },
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
        message: 'Please input phone number!',
        },
    ]}
    >
    <DatePicker onChangeSetDate={onChangeSetDate} needConfirm />
    </Form.Item>

    <Form.Item
    wrapperCol={{
        offset: 8,
        span: 16,
    }}
    >
    </Form.Item>
</Form>


  </Modal>
  <Table dataSource={data} columns={columns} />
</div>
);
}