import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Menu, Table } from "antd";
import DetailActiveHistory from "../DetailActiveHistory/DetailActiveHistory";

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
    key: '1',
    icon: <MailOutlined />,
    label: 'History transaction',
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: 'Request Sell History',

  },
  {
    key: '3',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    
  },
  {
    key: '4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    
  },
  
];
export const ActiveHistory = () => {
  const [title,setTitle]= useState(items[0].label)

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
        defaultOpenKeys={['1']}
        onSelect={({key})=>{
          setTitle(items[key-1].label);
        }}
        
        
     items={items}
      >
           
      </Menu>
      <DetailActiveHistory title={title}/>
        </div>
    </HomePage>
   
  );
};

export default ActiveHistory;
