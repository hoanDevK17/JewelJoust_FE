import { useState } from "react";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const DepositForm = () => {
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value * 25.238 : 0);
  };

  const handleSubmit = () => {
    console.log("Amount:", amount);
  };
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <p>
        <ArrowLeftOutlined
          onClick={() => {
            navigate("/Wallet/Withdrawal");
          }}
        />{" "}
        Banking
      </p>
      <div style={{ display: "flex", gap: 100 }}>
        <Form
          name="deposit_form"
          layout="vertical"
          onFinish={handleSubmit}
          style={{
            width: "40%",
            padding: 20,
            border: "solid 1px",
            borderRadius: 10,
          }}
        >
          <h1>Amount</h1>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div
        >
          <div style={{ marginTop: 20 }}>
            <h1>Payment Guide</h1>
            <p>1. Fill in the deposit amount &gt; click submit.</p>
            <p>
              2. Please transfer correct bank information and fill in the
              correct payment gateway content displayed.
            </p>
            <p>
              3. Points will be automatically updated to your account after 2-3
              minutes of depositing. In case of refusal, please contact customer
              service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => (
  <div>
    <DepositForm />
  </div>
);

export default App;
