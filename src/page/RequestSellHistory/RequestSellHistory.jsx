import { useEffect, useState } from "react";
import HomePage from "../../component/home-default/home";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Col, Modal, Row, Spin, Steps, Table, Tag } from "antd";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { APIgetallrequestUser } from "../../api/api";
import dayjs from "dayjs";

// set format cho date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

// tạo ra timeline
  // in ra step 
  const renderSteps = (status) => {
    return (
      <Steps current={0}>
      <Steps.Step
        title="Initial Valuation"
        status={getStatusForStep("Initial Valuation", status)}
        icon={getIconForStep("Initial Valuation", status)}
      />
      <Steps.Step
        title="Delivery"
        status={getStatusForStep("Delivery", status)}
        icon={getIconForStep("Delivery", status)}
      />
      <Steps.Step
        title="Pricing Phase"
        status={getStatusForStep("Pricing Phase", status)}
        icon={getIconForStep("Pricing Phase", status)}
      />
      <Steps.Step
        title="Done"
        status={getStatusForStep("Done", status)}
        icon={getIconForStep("Done", status)}
      />
    </Steps>
    );
  };

  //lấy status từ Status
  const getStatusForStep = (title, status) => {
    switch (title) {
      case "Initial Valuation":
        switch (status) {
          case "PENDING":
            return "process";
          case "REJECTED":
          case "CANCEL":
            return "error";
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "finish";
          default:
            return "finish";
        }
      case "Delivery":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
            return "wait";
          case "CONFIRMED":
            return "process";
          case "RECEIVED":
            return "finish"
          case "MISSED":
            return "error"
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "wait";
          default:
            return "wait";
        }
      case "Pricing Phase":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "MISSED":
            return "wait"
          case "RECEIVED":
          case "REVIEW":
            return "process"
          case "UNACCEPTED":
          case "UNAPPROVED":
            return "error"
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return "finish";
          default:
            return "wait";
        }
      case "Done":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
            return "wait";
          case "APPROVED":
            return "process";
          case "AGREED":
            return "finish";
          case "DECLINED":
            return "error";
          default:
            return "wait";
        }
      default:
        return "wait";
    }
  };

  // lấy icon từ Status
  const getIconForStep = (title, status) => {
    switch (title) {
      case "Initial Valuation":
        switch (status) {
          case "PENDING":
            return <LoadingOutlined />;
          case "REJECTED":
          case "CANCEL":
            return <CloseCircleOutlined />;
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <CheckCircleOutlined />;
        }
      case "Delivery":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
            return <ClockCircleOutlined />;
          case "CONFIRMED":
            return <LoadingOutlined />;
          case "RECEIVED":
            return <CheckCircleOutlined />;
          case "MISSED":
            return <CloseCircleOutlined />;
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <CheckCircleOutlined />;
        }
      case "Pricing Phase":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "MISSED":
            return <ClockCircleOutlined />;
          case "RECEIVED":
          case "REVIEW":
            return <LoadingOutlined />;
          case "UNACCEPTED":
          case "UNAPPROVED":
            return <CloseCircleOutlined />;
          case "APPROVED":
          case "AGREED":
          case "DECLINED":
            return <CheckCircleOutlined />;
          default:
            return <ClockCircleOutlined />;
        }
      case "Done":
        switch (status) {
          case "PENDING":
          case "REJECTED":
          case "CANCEL":
          case "CONFIRMED":
          case "RECEIVED":
          case "MISSED":
          case "REVIEW":
          case "UNACCEPTED":
          case "UNAPPROVED":
            return <ClockCircleOutlined />;
          case "APPROVED":
            return <LoadingOutlined />;
          case "AGREED":
            return <CheckCircleOutlined />;
          case "DECLINED":
            return <CloseCircleOutlined />;
          default:
            return <ClockCircleOutlined />;
        }
      default:
        return <ClockCircleOutlined />;
    }
  };

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",

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
    title: "ultimateValuation",
    dataIndex: "ultimateValuation",
    key: "ultimateValuation",
    render: (ultimateValuation) =>
      ultimateValuation?.price ? ultimateValuation?.price : "N/A",
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
            <div> 
         {renderSteps(currentRequest?.status)}
        </div>
          <div style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff', // Màu nền
            marginBottom: '10px',
          }}>
          <Row gutter={[16, 16]}>
            <Col span={24} >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <p>
                            <strong>ID:</strong> {currentRequest?.id}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Name:</strong> {currentRequest?.jewelryname}
                        </p>
                    </Col>
                </Row>
            </Col>
            <Col span={24} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', }}>
                <Row gutter={[16, 16]} style={{ paddingTop: '10px' }}>
                    <Col span={23}>
                        <p>
                            <strong>Request Date: </strong> {" "} {formatDate(currentRequest?.requestdate)}
                        </p>
                    </Col>
                </Row>
            </Col>
            <Col span={24} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', }}>
                <Row gutter={[16, 16]} style={{ paddingTop: '10px' }}>
                    <Col span={12}>
                        <p>
                            <strong>Initial Price:</strong> {currentRequest?.jewelryinitialprice}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Status:</strong> {currentRequest?.status}
                        </p>
                    </Col>
                </Row>
            </Col>
            <Col span={24} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)',}}>
                <Row gutter={[16, 16]} style={{ paddingTop: '10px' }}>
                    <Col span={24}>
                        <p>
                            <strong>Description:</strong>
                        </p>
                        <div style={{ 
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f9f9f9'
                        }}>
                            {currentRequest?.jewelrydescription}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
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
