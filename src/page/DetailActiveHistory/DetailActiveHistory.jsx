import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Menu, Table } from "antd";
import { COLUMS_REQUEST_SELL } from "../../constants/constants";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { APIgetallrequestUser } from "../../api/api";

// function getItem(label, key, icon, children) 
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

const daaaa=[1,2,3];

const DetailActiveHistory = ({title}) => {
    const [data,setData] = useState();
    const token = useSelector(selectUser).token;
    const [columns,setColumns] = useState();

  const fetchData = async () => {
    switch(title) 
{
  case "Request Sell History":
    await APIgetallrequestUser(token).then((response) => {
      console.log();
     
      setData( response.data.sort((a,b) => b.id-a.id));
    });
    break;
    default: setData('')
}
    
    
  };
  useEffect(() => {
    switch(title) 
    {
      case "Request Sell History":{
        setColumns(COLUMS_REQUEST_SELL);
        break;
      }
      default: setColumns([])
    }
  
  }, [title]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
    title={title}
    extra={<a href="#">More</a>}
    style={{
      width: "100%",
    
    }}
  >

   <Table dataSource={data} columns={columns} />

   
  </Card>
   
  );
};

export default DetailActiveHistory;
