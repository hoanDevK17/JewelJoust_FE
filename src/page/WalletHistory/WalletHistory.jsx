import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin, Table, message } from "antd";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { APICreateQR, APIgetTransactions, APIWithDrawal } from "../../api/api"; // Sửa đổi chỗ này để thêm APIgetTransactions

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function WalletHistory() {
  const navigate = useNavigate()
  const {pageNum}= useParams()
  const [totalRow, setTotalRow] = useState(0);
  const [pageNumber, setPageNumber] = useState(Number(pageNum));
  const onChangePaging = (pageNumber) => {
    navigate(`/Wallet/History/${pageNumber.current}`)
    setPageNumber(pageNumber.current);
  };
  useEffect(() => {
    console.log(pageNumber);
    fetchData(pageNumber - 1);
  }, [pageNumber]);
  const sort = "id,desc";
  const pageSize = 7;
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
      render: (text) => {
        const formattedAmount = Number(text)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedAmount;
      },
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "N/A"), // Hiển thị "N/A" nếu không có trạng thái
    },
  ];

  const [data, setData] = useState([]);
  const user = useSelector(selectUser);

  const [usdRate, setUsdRate] = useState(null);
  const fetchData = async (page) => {
    setIsLoading(true);
    await APIgetTransactions(page, pageSize, sort)
      .then((response) => {
        console.log(response);
        setTotalRow(response.data?.totalElements);
        setData(response.data?.content);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchUsdRate = async () => {
    try {
      const response = await axios.get(
        "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx"
      );
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, "text/xml");
      const usdNode = xml.querySelector('Exrate[CurrencyCode="USD"]');
      if (usdNode) {
        setUsdRate({
          buy: usdNode.getAttribute("Buy"),
          transfer: usdNode.getAttribute("Transfer"),
          sell: usdNode.getAttribute("Sell"),
        });
      }
    } catch (error) {
      console.error("Error fetching the exchange rate data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsdRate();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);
  const formatSetConvertedAmount = (num) => {
    // Làm tròn xuống đến hai chữ số thập phân
    let truncated = Math.floor(num * 100) / 100;
    // Chuyển thành chuỗi với hai chữ số thập phân và thêm dấu cách cho các nhóm số hàng nghìn
    let formatted = truncated.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (formatted.endsWith(".00")) {
      formatted = formatted.slice(0, -3);
    }
    return formatted;
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(
      value ? value / parseFloat(usdRate?.sell.replace(/,/g, "") * 1.01) : 0
    );
  };
  const handleAmountSub = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(
      value ? value * parseFloat(usdRate?.buy.replace(/,/g, "") * 0.99) : 0
    );
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
    APICreateQR(
      values.amount,
      parseFloat(usdRate?.sell.replace(/,/g, "") * 1.01)
    )
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
    console.log(
      "Subtract values:",
      values.bankName,
      values.accountNumber,
      values.recipientName,
      values.amount
    );
    APIWithDrawal(
      values.bankName,
      values.accountNumber,
      values.recipientName,
      Math.floor(
        values.amount * parseFloat(usdRate?.sell.replace(/,/g, "") * 0.99) * 100
      ) / 100,
      values.amount
    )
      .then((response) => {
        console.log(response);
        message.success("Create a successful money order");
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
    handleSubtractOk();
  };

  const formattedBalance = (balance) => {
    // Làm tròn xuống đến hai chữ số thập phân
    let truncated = Math.floor(balance * 100) / 100;
    // Chuyển thành chuỗi với hai chữ số thập phân và thêm dấu cách cho các nhóm số hàng nghìn
    return truncated.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <>
      <div>
        {usdRate && (
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
              <div>
                Balance: {formattedBalance(Number(user?.wallet?.balance))}$
              </div>
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
        )}
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
                <p>= {formatSetConvertedAmount(convertedAmount)} $</p>
                <p>The Unit Of Calculation is: </p>
                <p>
                  1$ ={" "}
                  {formatSetConvertedAmount(
                    parseFloat(usdRate?.sell.replace(/,/g, "") * 1.01)
                  )}
                  VND
                </p>
                <p>
                  Conversion Amount: {formatSetConvertedAmount(convertedAmount)}{" "}
                  $
                </p>

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
                    2. Please transfer correct bank information and fill in the
                    correct payment gateway content displayed.
                  </p>
                  <p>
                    3. Points will be automatically updated to your account
                    after 2-3 minutes of depositing. In case of refusal, please
                    contact customer service.
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
                <p>= {formatSetConvertedAmount(convertedAmount)} VND</p>
                <p>The Unit Of Calculation is: </p>
                <p>
                  1$ ={" "}
                  {formatSetConvertedAmount(
                    parseFloat(usdRate?.buy.replace(/,/g, "") * 0.99)
                  )}{" "}
                  VNĐ
                </p>
                <p>
                  Conversion Amount: {formatSetConvertedAmount(convertedAmount)}{" "}
                  VND
                </p>
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
                    2. Please transfer correct bank information and fill in the
                    correct payment gateway content displayed.
                  </p>
                  <p>
                    3. Points will be automatically updated to your account
                    after 2-3 minutes of depositing. In case of refusal, please
                    contact customer service.
                  </p>
                </div>
              </div>
            </div>
          </>
        </Modal>
        <div style={{ width: "100%", maxHeight: "600px" }}>
          {isLoading ? (
            <Spin
              style={{
                width: "100%",
                marginTop: "150px",
              }}
            ></Spin>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              size="middle"
              pagination={{
                total: totalRow,
                current: pageNumber,
                pageSize: pageSize,
              }}
              onChange={onChangePaging}
              style={{ height: "100%" }}
            />
          )}
        </div>
      </div>
    </>
  );
}
