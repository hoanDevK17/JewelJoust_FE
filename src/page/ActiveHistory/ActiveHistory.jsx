import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import {
  AppstoreOutlined,
  CalendarOutlined,

  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
    icon: <CalendarOutlined />,
    label: "Request Sell History",
    path: "/RequestSell",
  },
  
  
];
export const ActiveHistory = () => {
  const location = useLocation();
  const [currentItem, setCurrentItem] = useState();
  const navigate = useNavigate();

  // const [uri,setUri] = useState(items[)
  useEffect(() => {
    // Lấy path từ location và cắt bỏ "/ActiveHistory" để so sánh với path trong items
    const currentPath = location.pathname.slice(14);

    // Tìm item có path trùng với currentPath
    const selectedItem = items.find((item) => item.path === currentPath);

    if (selectedItem) {
      setCurrentItem(selectedItem);
    } else {
      setCurrentItem(items[0]);
    }
  }, [location.pathname]);
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
            const selectedItem = items.find((item) => item.key === key);
            if (selectedItem) {
              setCurrentItem(selectedItem);
              navigate(`/ActiveHistory${selectedItem.path}`);
            }
          }}
          items={items}
          selectedKeys={[currentItem?.key]}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
        <Card
          title={currentItem?.label}
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
