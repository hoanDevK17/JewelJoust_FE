import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Menu, Table } from "antd";
import RequestSellHistory from "../RequestSellHistory/RequestSellHistory";
import { Outlet, useNavigate } from "react-router-dom";

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
export const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "History transaction",
    path: "/",
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Request Sell History",
    path: "/RequestSell",
  },
  {
    key: "3",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    path: "/",
  },
  {
    key: "4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    path: "/",
  },
];
export const ActiveHistory = () => {
  const [title, setTitle] = useState(items[0].label);
  const navigate = useNavigate();
  // const handleSelectKey = (keyPath) => {
  //   setKey(keyPath);
  // };

  return (
    <HomePage>
      <div
        style={{
          display: "flex",
          gap: "32px",
          maxWidth: "calc(100% - 48px)",
          margin: "auto",
          height: "calc(100vh + 97px)",
        }}
      >
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          onSelect={({ key }) => {
            setTitle(items[key - 1].label);
            navigate(`/ActiveHistory${items[key - 1].path}`);
          }}
          items={items}
        ></Menu>
        <Card
          title={title}
          style={{
            width: "100%",
          }}
        >
          <Outlet />
        </Card>
      </div>
    </HomePage>
  );
};

export default ActiveHistory;
