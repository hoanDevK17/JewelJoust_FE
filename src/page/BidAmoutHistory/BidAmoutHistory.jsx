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

import { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { APICreateQR, APIgetAllBidding, APIWithDrawal } from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import moment from "moment";
export default function WalletHistory() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount ",
      dataIndex: "bid_price",
      key: "amount",
      render: (text) => {
        const formattedAmount = Number(text).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedAmount;
      }
    },
    {
      title: "Bid Time",
      dataIndex: "bid_time",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Auction Sessions",
      // Thay 'method' bằng trường tương ứng trong 'accountRegistration'
      dataIndex: "auctionRegistration",
      key: "auctionRegistration",

      render: (auctionRegistration) =>
        auctionRegistration.auctionSession?.nameSession,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);
  const user = useSelector(selectUser);
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value / 25238 : 0);
  };
  const handleAmountSub = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value * 25238 : 0);
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
        message.error("Something went wrong");
      });
    handleAddOk();
  };

  const onFinishSubtract = (values) => {
    console.log("Subtract values:",  values.bankName,
      values.accountNumber,
      values.recipientName,
      values.amount);
    APIWithDrawal(
      values.bankName,
      values.accountNumber,
      values.recipientName,
      values.amount
    )
      .then((response) => {
        console.log(response);
        message.success("Create a successful money order")
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
    handleSubtractOk();
  };
  const balance = user?.wallet?.balance;
  const formattedBalance = Number(balance).toFixed(2);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    APIgetAllBidding()
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                      suffix="VND"
                    />
                  </Form.Item>
                  <p>= {convertedAmount.toFixed(2)} $</p>
                  <p>The Unit Of Calculation is:</p>
                  <p>1$ = 25.24 VND</p>
                  <p>Conversion Amount: {convertedAmount.toFixed(2)} $</p>

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
                  <p>= {convertedAmount.toFixed(2)} VND</p>
                  <p>The Unit Of Calculation is: </p>
                  <p>1$ = 25.24 VND</p>
                  <p>Conversion Amount: {convertedAmount.toFixed(2)} VND</p>
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
