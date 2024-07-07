import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Spin,
  Table,
  message,
} from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { APIDeposit } from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
export default function WalletHistory() {
  const dataSource = [
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "3",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },

    {
      title: "Request Date",
      dataIndex: "RequestDate",
      key: "RequestDate",
    },
    {
      title: "Method",
      dataIndex: "Method",
      key: "Method",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
  ];
  const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleRecharge = () => {
    setIsLoading(true);
    navigate("/Wallet/Deposit/Recharge");
    setIsLoading(false);
  };
  const handleWithdrawal = () => {
    setIsLoading(true);
    navigate("/Wallet/Withdraw/Withdraw");
    setIsLoading(false);
  };
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);
  const user = useSelector(selectUser);
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value / 25.238 : 0);
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
    console.log(values.amount);
    console.log(user?.wallet?.id, values.amount, "Deposit " + values.amount);
    APIDeposit(user?.wallet?.id, values.amount, "Deposit " + values.amount)
      .then(() => {
        message.success("Deposit added successfully" + values.amount);
      })
      .catch((error) => {
        message.error("Something went wrong", error);
      });
    handleAddOk();
  };

  const onFinishSubtract = (values) => {
    console.log("Subtract values:", values);
    handleSubtractOk();
  };
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
            <div>Username: username</div>
            <div>Full Name: Full Name</div>
            <div>Email: email@example.com</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>Số dư: 1000</div>
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
                  <p>= {convertedAmount} $</p>
                  <p>The Unit Of Calculation is: 25.238$</p>
                  <p>Conversion Amount: {convertedAmount.toFixed(3)} $</p>

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
                      onChange={handleAmountChange}
                      suffix="$"
                    />
                  </Form.Item>
                  <p>= {convertedAmount} VND(k)</p>
                  <p>The Unit Of Calculation is: 25.238$</p>
                  <p>Conversion Amount: {convertedAmount.toFixed(3)} VND(k)</p>
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
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}
