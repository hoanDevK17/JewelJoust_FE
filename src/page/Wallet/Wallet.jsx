import { Card, Menu } from "antd";
import HomePage from "../../component/home-default/home";
import "./Wallet.scss"; // Import the SCSS file
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  CalendarOutlined, MailOutlined, } from "@ant-design/icons";
export const itemWallet = [
  
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Your Balance",
    path: "/Balance",
  },{
    key: "2",
    icon: <MailOutlined />,
    label: "Deposit History",
    path: "/Deposit",
  },
  {
    key: "3",
    icon: <CalendarOutlined />,
    label: "Withdrawal History",
    path: "/Withdrawal",
  },
 
];
export default function Wallet() {
  const [title, setTitle] = useState(itemWallet[0].label);
  const navigate = useNavigate();
 
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
            height: "fit-content"
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
            maxHeight: "100vh" 
          }}
        >
          <Outlet />
        </Card>
      </div>
    </HomePage>
  );
}
