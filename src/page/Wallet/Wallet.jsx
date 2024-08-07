import { Card, Menu } from "antd";
import HomePage from "../../component/home-default/home";
import "./Wallet.scss"; // Import the SCSS file
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HistoryOutlined } from "@ant-design/icons";

export const itemWallet = [
  {
    key: "1",
    icon: <HistoryOutlined />,
    label: "Transaction history",
    path: "/History/1",
  },
  {
    key: "2",
    icon: <HistoryOutlined />,
    label: "Bid Amount history",
    path: "/BidAmoutHistory",
  },
];
export default function Wallet() {
  const [title, setTitle] = useState(itemWallet[0].label);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  return (
    <HomePage>
      <div
        style={{
          display: "flex",
          gap: "32px",
          margin: "auto",
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
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Card>
      </div>
    </HomePage>
  );
}
