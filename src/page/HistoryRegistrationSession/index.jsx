import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  FireOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Footer from "../../component/footer/footer.jsx";
import { Button, Modal, Spin, Steps, Table, Tag } from "antd";

import { APIHistoryRegisSession } from "../../api/api";
import dayjs from "dayjs";
import { Container, Row, Col } from "react-bootstrap";
import HomePage from "../../component/home-default/home";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

// tạo ra timeline
// in ra step

//lấy status từ Status

const columns = (setCurrentId, navigate) => [
  {
    title: "No.",
    key: "index",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "Name",
    dataIndex: ["auctionSession", "nameSession"],
    key: "nameSession",
  },
  {
    title: "Created Date",
    dataIndex: "requestdate",
    key: "requestdate",
    render: (requestdate) => dayjs(requestdate).format("HH:mm DD/MM/YYYY "),
  },
  {
    title: "Desired Price",
    dataIndex: ["auctionSession", "auctionRequest", "jewelryinitialprice"],
    key: "jewelryinitialprice",
    render: (jewelryinitialprice) =>
      jewelryinitialprice > 0 ? `${jewelryinitialprice}$` : "N/A",
    sorter: (a, b) =>
      (a?.auctionSession?.auctionRequest?.jewelryinitialprice || 0) -
      (b?.auctionSession?.auctionRequest?.jewelryinitialprice || 0),
  },
  {
    title: "Initial Price",
    dataIndex: [
      "auctionSession",
      "auctionRequest",
      "initialValuations",
      "price",
    ],
    key: "price",
    render: (price) => (price > 0 ? `${price}$` : "N/A"),
    sorter: (a, b) =>
      (a?.auctionSession?.auctionRequest?.initialValuations?.price || 0) -
      (b?.auctionSession?.auctionRequest?.initialValuations?.price || 0),
  },
  {
    title: "Ultimate Price",
    dataIndex: [
      "auctionSession",
      "auctionRequest",
      "ultimateValuation",
      "price",
    ],
    key: "price",
    render: (price) => (price > 0 ? `${price}$` : "N/A"),
    sorter: (a, b) =>
      (a?.auctionSession?.auctionRequest?.ultimateValuation?.price || 0) -
      (b?.auctionSession?.auctionRequest?.ultimateValuation?.price || 0),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Detail",
    key: "detail",
    render: (_, record) => (
      <Button
        type="primary"
        danger
        onClick={() => {
          navigate(`/detail/${record.auctionSession.id}`);
        }}
      >
        View Session <FireOutlined />
      </Button>
    ),
  },
];

function RegistrationSessionHistory() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(-1);
  const [currentRequest, setCurrentRequest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    APIHistoryRegisSession()
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (currentId > 0) {
      setCurrentRequest(data.find((request) => request.id === currentId));
    }
  }, [currentId]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <HomePage>
        <Container fluid>
          <Row className="justify-content-xl-center">
            <Col xl={12}>
              {isLoading ? (
                <Spin style={{ width: "100%" }}></Spin>
              ) : (
                <>
                  <Modal
                    title={`Detail Information`}
                    open={currentId >= 0}
                    onCancel={() => {
                      setCurrentId(-1);
                    }}
                  ></Modal>

                  <Table
                    columns={columns(setCurrentId, navigate)}
                    dataSource={data}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </HomePage>
    </>
  );
}

export default RegistrationSessionHistory;
