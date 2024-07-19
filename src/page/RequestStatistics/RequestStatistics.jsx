import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from 'antd';
import axios from "axios";

export default function RequestStatistics() {
const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await axios.post("https://665d6f09e88051d604068e77.mockapi.io/category", values);
            setData([...data, response.data]);
            setIsModalOpen(false);
            console.log(response);
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Category Name',
          dataIndex: 'categoryName',
          key: 'categoryname',
        },
        {
            title: 'Action',
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

const handleDelate = () =>{
    // console.log(value);
    // const response = axios.delete(
    //     `https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`
    // );
    // // lọc ra tất cả data loại bỏ data vừa bị xoá
    // setData(data.filter((data) => data.id != value.id));
};


return (
<div>
     <Button type="primary" onClick={showModal}>
    Add new category
  </Button>
  <Modal 
  footer={false}
  title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
    
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
    }}
    initialValues={{
    remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
>
    <Form.Item
    label="Category Name"
    name="categoryName"
    rules={[
        {
        required: true,
        message: 'Please input your category name!',
        },
    ]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    wrapperCol={{
        offset: 8,
        span: 16,
    }}
    >
    <Button type="primary" htmlType="submit">
        Submit
    </Button>
    </Form.Item>
</Form>



  </Modal>
  <Table dataSource={data} columns={columns}  size="middle"/>
</div>
);
}