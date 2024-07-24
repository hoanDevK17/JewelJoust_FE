import {
  Spin,
  Table,
  message,
} from "antd";

import { useEffect, useState } from "react";
import { APICreateQR, APIgetAllBidding } from "../../api/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import moment from "moment";

export default function WalletHistory() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount ",
      dataIndex: "bid_price",
      key: "amount",
      render: (text) => {
        const formattedAmount = Number(text)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedAmount;
      },
    },
    {
      title: "Bid Time",
      dataIndex: "bid_time",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },

    {
      title: "Auction Sessions",
      // Thay 'method' bằng trường tương ứng trong 'accountRegistration'
      dataIndex: "auctionRegistration",
      key: "auctionRegistration",

      render: (auctionRegistration) =>
        auctionRegistration.auctionSession?.nameSession,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSubtractModalVisible, setIsSubtractModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const [convertedAmount, setConvertedAmount] = useState(0);
  const user = useSelector(selectUser);
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value / 25238 : 0);
  };
  const handleAmountSub = (e) => {
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount(value ? value * 25238 : 0);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const showSubtractModal = () => {
    setIsSubtractModalVisible(true);
  };

  const handleSubtractOk = () => {
    setIsSubtractModalVisible(false);
  };

  const handleSubtractCancel = () => {
    setIsSubtractModalVisible(false);
  };

  const onFinishAdd = (values) => {
    console.log("oki" + convertedAmount.toFixed(2));
    // console.log(user?.wallet?.id, values.amount, "Deposit " + values.amount);
    APICreateQR(values.amount)
      .then((response) => {
        console.log(response);
        window.open(response.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
    handleAddOk();
  };



  const balance = Number(user?.wallet?.balance);

  const formattedBalance = (Math.floor(balance * 100) / 100)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    APIgetAllBidding()
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log;
  const formatSetConvertedAmount = (num) => {
    // Làm tròn xuống đến hai chữ số thập phân
    let truncated = Math.floor(num * 100) / 100;
    // Chuyển thành chuỗi với hai chữ số thập phân và thêm dấu cách cho các nhóm số hàng nghìn
    return truncated.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <>
      <div>
        <div style={{ width: "100%" }}>
          {isLoading ? (
            <Spin
              style={{
                width: "100%",
                marginTop: "150px",
              }}
            ></Spin>
          ) : (
            <Table dataSource={data} columns={columns} size="middle" />
          )}
        </div>
      </div>
    </>
  );
}
