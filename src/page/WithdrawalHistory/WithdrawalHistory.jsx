import { Button, ConfigProvider, Spin, Table } from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function WithdrawalHistory() {
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
      key: "1",
      ID: "Mike",
      age: 32,
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
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
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
      key: "1",
      ID: "Mike",
      age: 32,
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
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
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
      key: "1",
      ID: "Mike",
      age: 32,
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleRecharge = () => {
    setIsLoading(true);
    navigate("/Wallet/Withdraw/Withdraw");
    setIsLoading(false);
  };
  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  return (
    <>
      {" "}
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
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                      colors3
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                      colors3
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" size="large" onClick={handleRecharge}>
                Withdraw Money
              </Button>
            </ConfigProvider>
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            {" "}
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}
