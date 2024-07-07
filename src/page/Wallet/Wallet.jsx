import { Card, Menu } from "antd";
import HomePage from "../../component/home-default/home";
import "./Wallet.scss"; // Import the SCSS file
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CalendarOutlined,
  HistoryOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { APIgetTransactions } from "../../api/api";
export const itemWallet = [
  {
    key: "1",
    icon: <HistoryOutlined />,
    label: "Transaction history",
    path: "/History",
  },
];
export default function Wallet() {
  const [title, setTitle] = useState(itemWallet[0].label);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    APIgetTransactions().then((response) => {
      console.log(response);
      setData(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <HomePage>
      <div
        style={{
          display: "flex",
          gap: "32px",
          maxWidth: "calc(100% - 48px)",
          margin: "auto",
          height: "calc(100vh - 170px)",
        }}
      >
        <Menu
          style={{
            width: 256,
            height: "fit-content",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          onSelect={({ key }) => {
            setTitle(itemWallet[key - 1].label);
            navigate(`/Wallet${itemWallet[key - 1].path}`);
          }}
          items={itemWallet}
        ></Menu>
        <Card
          title={title}
          style={{
            width: "100%",
            maxHeight: "100vh",
          }}
        >
          <Outlet />
        </Card>
      </div>
    </HomePage>
  );
}
