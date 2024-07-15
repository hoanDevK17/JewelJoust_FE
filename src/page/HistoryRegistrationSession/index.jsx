import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Footer from "../../component/footer/footer.jsx";
import { Button, Modal, Spin, Steps, Table, Tag } from "antd";

import { APIHistoryRegisSession } from "../../api/api";
import dayjs from "dayjs";
import { Container, Row, Col } from "react-bootstrap";
import HomePage from "../../component/home-default/home";

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

const columns = (setCurrentId) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 1,
    },
  },
  {
    title: "Name",
    dataIndex: "jewelryname",
    key: "jewelryname",
  },
  {
    title: "CreatedDate",
    dataIndex: "requestdate",
    key: "requestdate",
    render: (requestdate) => dayjs(requestdate).format("HH:mm DD/MM/YYYY "),
  },
  {
    title: "Desired Price",
    dataIndex: "jewelryinitialprice",
    key: "jewelryinitialprice",
    render: (price) => `${price}$`,
    sorter: {
      compare: (a, b) => a.jewelryinitialprice - b.jewelryinitialprice,
      multiple: 2,
    },
  },
  {
    title: "Initial Price",
    dataIndex: "initialValuations",
    key: "initialValuations",
    render: (initialValuations) =>
      initialValuations?.price > 0 ? `${initialValuations?.price}$` : "N/A",
    sorter: {
      compare: (a, b) =>
        a.initialValuations?.price - b.initialValuations?.price,
      multiple: 3,
    },
  },
  {
    title: "Ultimate Price",
    dataIndex: "ultimateValuation",
    key: "ultimateValuation",
    render: (ultimateValuation) =>
      ultimateValuation?.price > 0 ? `${ultimateValuation?.price}$` : "N/A",
    sorter: {
      compare: (a, b) =>
        a.ultimateValuation?.price - b.ultimateValuation?.price,
      multiple: 3,
    },
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",

    filterMode: "tree",
    filters: [
      {
        text: "PENDING",
        value: "PENDING",
      },
      {
        text: "REJECTED",
        value: "REJECTED",
      },
      {
        text: "CONFIRMED",
        value: "CONFIRMED",
      },
      {
        text: "CANCEL",
        value: "CANCEL",
      },
      {
        text: "RECEIVED",
        value: "RECEIVED",
      },
      {
        text: "MISSED",
        value: "MISSED",
      },
      {
        text: "REVIEW",
        value: "REVIEW",
      },
      {
        text: "UNACCEPTED",
        value: "UNACCEPTED",
      },
      {
        text: "UNAPPROVED",
        value: "UNAPPROVED",
      },
      {
        text: "APPROVED",
        value: "APPROVED",
      },
      {
        text: "AGREED",
        value: "AGREED",
      },
      {
        text: "DECLINED",
        value: "DECLINED",
      },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.status.includes(value),
    render: (text) => {
      let color = "";
      switch (text) {
        case "PENDING":
          color = "lightskyblue";
          break;
        case "REJECTED":
          color = "tomato";
          break;
        case "CONFIRMED":
          color = "limegreen";
          break;
        case "CANCEL":
          color = "gray";
          break;
        case "RECEIVED":
          color = "mediumseagreen";
          break;
        case "MISSED":
          color = "gold";
          break;
        case "REVIEW":
          color = "orange";
          break;
        case "UNACCEPTED":
          color = "orangered";
          break;
        case "UNAPPROVED":
          color = "darkorange";
          break;
        case "APPROVED":
          color = "forestgreen";
          break;
        case "AGREED":
          color = "dodgerblue";
          break;
        case "DECLINED":
          color = "red";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "Edit",
    render: (value, record) => (
      <Button
        type="primary"
        onClick={() => {
          setCurrentId(record.id);
        }}
      >
        <EditOutlined />
      </Button>
    ),
  },
];

function RegistrationSessionHistory() {
  const [data, setData] = useState();

  const [currentId, setCurrentId] = useState(-1);
  const [currentRequest, setCurrentRequest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    APIHistoryRegisSession()
      .then((response) => {
        setData(response.data.sort((a, b) => b.id - a.id));
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

                  <Table columns={columns(setCurrentId)} dataSource={data} />
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
