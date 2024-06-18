import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Col, Menu, Modal, Row, Spin, Table, Tag } from "antd";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { APIgetallrequestUser } from "../../api/api";
import dayjs from "dayjs";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 1,
    },
    // render: (a) => {console.log(a)}
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
        text: "Hoan",
        value: "Hoan",
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
];
function RequestSellHistory() {
  const title = "Request Sell History";
  const [data, setData] = useState();
  const token = useSelector(selectUser).token;

  const [currentId, setCurrentId] = useState(-1);
  const [currentRequest, setCurrentRequest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    await APIgetallrequestUser(token)
      .then((response) => {
        console.log(response);

        setData(response.data.sort((a, b) => b.id - a.id));
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
      {isLoading ? (
        <Spin
          style={{
            width: "100%",
          }}
        ></Spin>
      ) : (
        <>
          <Modal
            title={`Detail Information`}
            open={currentId >= 0}
            onCancel={() => {
              setCurrentId(-1);
            }}
          >
            <Row>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>ID:</strong> {currentRequest?.id}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>Name:</strong> {currentRequest?.jewelryname}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>Description:</strong>{" "}
                  {currentRequest?.jewelrydescription}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>Initial Price:</strong>{" "}
                  {currentRequest?.jewelryinitialprice}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>Created Date:</strong>{" "}
                  {dayjs(currentRequest?.requestdate).format("DD/MM/YYYY ")}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ fontSize: "16px" }}>
                  <strong>Status:</strong> {currentRequest?.status}
                </p>
              </Col>
            </Row>
          </Modal>
          <Table
            dataSource={data}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setCurrentId(record.id);
                }, // click row
              };
            }}
          />
        </>
      )}
    </>
  );
}

export default RequestSellHistory;
