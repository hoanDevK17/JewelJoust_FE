// src/components/BalanceDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BalanceDisplay.scss"; // Update the import to the SCSS file
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const BalanceDisplay = () => {
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/balance");
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching the balance:", error);
    }
  };

  const resetBalance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reset-balance"
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error resetting the balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="balance-display">
      <p className="balance-label">CURRENT BALANCE</p>
      <div className="balance">
        <p className="balance-amount">
          <Input
            style={{
              width: "70%",
              border: "none",
              backgroundColor: "transparent",
              color: "black",
              fontSize: "15px",
            }}
            defaultValue={
              balance !== null ? balance.toLocaleString() : "0,0"
            }
            prefix="$"
            suffix={
              <>
                <button onClick={resetBalance}>
                  <ReloadOutlined />
                </button>
                <button onClick={() => {
                console.log("ok");
                navigate("/");
              }}><PlusOutlined /></button>
              </>
            }
            disabled
          />
        </p>
      </div>
    </div>
  );
};

export default BalanceDisplay;
