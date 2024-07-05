import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const DepositPage = () => {

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const showSubtractModal = () => {
    setIsSubtractModalVisible(true);
  };

  const handleSubtractOk = () => {
    setIsSubtractModalVisible(false);
  };

  const handleSubtractCancel = () => {
    setIsSubtractModalVisible(false);
  };

  const onFinishAdd = (values) => {
    console.log('Add values:', values);
    handleAddOk();
  };

  const onFinishSubtract = (values) => {
    console.log('Subtract values:', values);
    handleSubtractOk();
  };

 
  return (
    <div>
      <PlusCircleOutlined
        type="primary"
        onClick={showAddModal}
        style={{
          position: 'absolute',
          right: '30px',
          top: '15px',
          backgroundColor: '#1677ff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '6px 12px',
          fontSize: '16px',
          cursor: 'pointer',
          height: '35px',
          lineHeight: '23px',
        }}
      />
      <MinusCircleOutlined
        type="primary"
        onClick={showSubtractModal}
        style={{
          position: 'absolute',
          right: '30px',
          top: '60px',
          backgroundColor: '#1677ff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '6px 12px',
          fontSize: '16px',
          cursor: 'pointer',
          height: '35px',
          lineHeight: '23px',
        }}
      />
      <Modal
        title="Add Money"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
          name="add_money"
          onFinish={onFinishAdd}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
            style={{ width: '100%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Subtract Money"
        visible={isSubtractModalVisible}
        onOk={handleSubtractOk}
        onCancel={handleSubtractCancel}
      >
        <Form
          name="subtract_money"
          onFinish={onFinishSubtract}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
            style={{ width: '100%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: 'Please input the bank name!' }]}
            style={{ width: '100%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: 'Please input the account number!' }]}
            style={{ width: '100%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Recipient Name"
            name="recipientName"
            rules={[{ required: true, message: 'Please input the recipient name!' }]}
            style={{ width: '100%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepositPage;
