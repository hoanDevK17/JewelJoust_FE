import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin, Table, message } from "antd";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { APICreateQR, APIDeposit, APIgetTransactions } from "../../api/api"; // Sửa đổi chỗ này để thêm APIgetTransactions
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function WalletHistory() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "TYPE",
      dataIndex: "transaction_type",
      key: "Method",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleString(), // Định dạng ngày
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "N/A"), // Hiển thị "N/A" nếu không có trạng thái
    },
  ];

  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const fetchData = async () => {
    setIsLoading(true); // Bắt đầu tải dữ liệu
    APIgetTransactions()
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc tải dữ liệu
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);
const formatSetConvertedAmount =(num)=> {
 return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

}

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value / 25.238 : 0);
  };
  const handleAmountSub = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value * 25.238 : 0);
  };

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
    console.log("oki" + convertedAmount.toFixed(2));
    // console.log(user?.wallet?.id, values.amount, "Deposit " + values.amount);
    APICreateQR(values.amount)
      .then((response) => {
        console.log(response);
        window.open(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleAddOk();
  };

  const onFinishSubtract = (values) => {
    console.log("Subtract values:", values);
    handleSubtractOk();
  };
  const balance = user?.wallet?.balance;
 
  const formattedBalance = balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#fff9e8",
            paddingTop: "50vh",
          }}
        ></Spin>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div>Username: {user?.username}</div>
            <div>Full Name: {user?.fullname}</div>
            <div>Email: {user?.email}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>Balance: {formattedBalance}</div>
              <PlusCircleOutlined
                type="primary"
                onClick={showAddModal}
                style={{
                  backgroundColor: "#1677ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  height: "35px",
                  lineHeight: "23px",
                }}
              />
              <MinusCircleOutlined
                type="primary"
                onClick={showSubtractModal}
                style={{
                  backgroundColor: "#1677ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  height: "35px",
                  lineHeight: "23px",
                }}
              />
            </div>
          </div>
          <Modal
            width={1200}
            title="Add Money"
            visible={isAddModalVisible}
            onOk={handleAddOk}
            onCancel={handleAddCancel}
          >
            <>
              {" "}
              <p>
                <ArrowLeftOutlined onClick={handleAddCancel} /> Banking
              </p>
              <div style={{ display: "flex", gap: 100 }}>
                <Form
                  name="deposit_form"
                  layout="vertical"
                  onFinish={onFinishAdd}
                  style={{
                    width: "100%",
                    padding: 20,
                    border: "solid 1px",
                    borderRadius: 10,
                    maxWidth: "350px",
                  }}
                >
                  <h1>Amount</h1>
                  <Form.Item
                    name="amount"
                    rules={[
                      { required: true, message: "Please input the amount!" },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      suffix="VND(k)"
                    />
                  </Form.Item>
                  <p>= {formatSetConvertedAmount(convertedAmount)} $</p>
                  <p>The Unit Of Calculation is: 25.24$</p>
                  <p>Conversion Amount: {formatSetConvertedAmount(convertedAmount)} $</p>

                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <div style={{ marginTop: 20 }}>
                    <h1>Payment Guide</h1>
                    <p>1. Fill in the deposit amount &gt; click submit.</p>
                    <p>
                      2. Please transfer correct bank information and fill in
                      the correct payment gateway content displayed.
                    </p>
                    <p>
                      3. Points will be automatically updated to your account
                      after 2-3 minutes of depositing. In case of refusal,
                      please contact customer service.
                    </p>
                  </div>
                </div>
              </div>
            </>
          </Modal>
          <Modal
            width={1200}
            title="Subtract Money"
            visible={isSubtractModalVisible}
            onOk={handleSubtractOk}
            onCancel={handleSubtractCancel}
          >
            <>
              {" "}
              <p>
                <ArrowLeftOutlined onClick={handleSubtractCancel} /> Banking
              </p>
              <div style={{ display: "flex", gap: 100 }}>
                <Form
                  name="deposit_form"
                  layout="vertical"
                  onFinish={onFinishSubtract}
                  style={{
                    width: "100%",
                    padding: 20,
                    border: "solid 1px",
                    borderRadius: 10,
                    maxWidth: "500px",
                  }}
                >
                  <h1>Amount</h1>
                  <Form.Item
                    name="amount"
                    rules={[
                      { required: true, message: "Please input the amount!" },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      value={amount}
                      onChange={handleAmountSub}
                      suffix="$"
                    />
                  </Form.Item>
                  <p>= {formatSetConvertedAmount(convertedAmount)} VND(k)</p>
                  <p>The Unit Of Calculation is: 25.24$</p>
                  <p>Conversion Amount: {formatSetConvertedAmount(convertedAmount)} VND(k)</p>
                  <Form.Item
                    label="Bank Name"
                    name="bankName"
                    rules={[
                      {
                        required: true,
                        message: "Please input the bank name!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Account Number"
                    name="accountNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input the account number!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Recipient Name"
                    name="recipientName"
                    rules={[
                      {
                        required: true,
                        message: "Please input the recipient name!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <div style={{ marginTop: 20 }}>
                    <h1>Payment Guide</h1>
                    <p>1. Fill in the deposit amount &gt; click submit.</p>
                    <p>
                      2. Please transfer correct bank information and fill in
                      the correct payment gateway content displayed.
                    </p>
                    <p>
                      3. Points will be automatically updated to your account
                      after 2-3 minutes of depositing. In case of refusal,
                      please contact customer service.
                    </p>
                  </div>
                </div>
              </div>
            </>
          </Modal>
          <div style={{ width: "100%" }}>
            <Table dataSource={data} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}
