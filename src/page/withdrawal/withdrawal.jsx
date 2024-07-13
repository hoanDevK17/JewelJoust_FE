import { useEffect, useState } from "react";
import { APIgetTransactionsWithDrawal, APIgetTransactionsWithDrawalConfirm } from "../../api/api";
import { Button, Spin, Table } from "antd";
import { CheckOutlined} from "@ant-design/icons";


export default function WalletHistory() {
    const handleConfirm =(record)=>{
        console.log(record.id);
        APIgetTransactionsWithDrawalConfirm(record.id).then((response) => {
            console.log(response);
            fetchData()
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        const formattedAmount = Number(text).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedAmount;
      }
      
    },
    {
      title: "TYPE",
      dataIndex: "transaction_type",
      key: "Method",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleString(), // Định dạng ngày
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "N/A"), // Hiển thị "N/A" nếu không có trạng thái
    },
    {
        title: "Confirm",
        render: (value, record) => (
          <Button
            type="primary"
            style={{ background: record.status === 'PENDING' ? 'green' : 'gray' }}
            onClick={() => handleConfirm(record)}
            disabled={record.status !== 'PENDING'}
          >
            <CheckOutlined />
          </Button>
        ),
      },
  ];

  const [data, setData] = useState([]);
 
  const fetchData = async () => {
    setIsLoading(true); 
    APIgetTransactionsWithDrawal()
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);


 
  return (
    <>
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
        
       
          <div style={{ width: "100%" }}>
            <Table dataSource={data} columns={columns}  />
          </div>
        
      )}
    </>
  );
}
