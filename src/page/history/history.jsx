import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  ProductOutlined,
  SettingOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Card, Layout, Menu, Table, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
 
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  
];
const Dashboard = () => {
  const [title,setTitle]= useState("History transaction")
  const items = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: 'Navigation One',
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: 'Navigation Two',
    },
    {
      key: 'sub1',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      
    },
    {
      key: 'sub2',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      
    },
    {
      key: 'link',
      icon: <LinkOutlined />,
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Ant Design
        </a>
      ),
    },
  ];
  // const handleSelectKey = (keyPath) => {
  //   setKey(keyPath);
  // };

  return (
    <HomePage>
        <div style={{display:"flex",gap:"32px",maxWidth:"calc(100% - 48px)",margin:"auto",
          height:"calc(100vh - 170px)"
        }}>
        <Menu
        
        style={{
          width: 256,
        
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        
        
     items={items}
      >
           
      </Menu>
   <Card
      title={title}
      extra={<a href="#">More</a>}
      style={{
        width: "100%",
        overflowY:"scroll"

      }}
    >
     <Table dataSource={dataSource} columns={columns} />
    </Card>
        </div>
    </HomePage>
   
  );
};

export default Dashboard;
