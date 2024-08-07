import { useEffect, useState } from "react";
import "./index.scss";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Select,
  message,
  Row,
  Col,
  Image,
  DatePicker,
  Upload,
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  APIContinue,
  APIPay,
  APIStop,
  APIcreateSession,
  APIgetAllRequestToSession,
  APIgetallSession,
  APIgetallacountbyRole,
  APIupdateSession,
} from "../../api/api";

import dayjs from "dayjs";
import uploadFile from "../../assets/hook/useUpload";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ManageSession() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const pageNum =
    searchParams.get("page") != null ? searchParams.get("page") : 1;

  const [currentId, setCurrentId] = useState(-1);
  const [form] = useForm();
  const [requestAuctionsAgreed, setRequestAuctionsAgreed] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [currentRequestID, setCurrentRequestID] = useState(-1);
  const [currentRequest, setCurrentRequest] = useState();
  const [currentSession, setCurrentSession] = useState();
  const { RangePicker } = DatePicker;
  const [messageApi, contextHolder] = message.useMessage();
  const [urlJewelry, setUrlJewelry] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [pageNumber, setPageNumber] = useState(Number(pageNum));
  const sort = "id,desc";
  const pageSize = 7;
  const user = useSelector(selectUser);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleStop = async () => {
    APIStop(currentSession.id)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const handleContinue = async () => {
    APIContinue(currentSession.id)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const handleFinish = async () => {
    APIPay(currentSession.id)
      .then((rs) => {
        console.log(rs);
        message.success("Successfully");
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong", error);
      })
      .finally(() => {
        setCurrentId(-1);
      });
  };

  const fetchData = async (page) => {
    setIsLoading(true);
    APIgetallSession(page, pageSize, sort)
      .then((response) => {
        console.log(response);
        setTotalRow(response.data?.totalElements);
        setData(response.data?.content);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onChangePaging = (pageNumber) => {
    navigate(`/dashboard/session?page=${pageNumber.current}`);
    setPageNumber(pageNumber.current);
  };
  useEffect(() => {
    console.log(pageNumber);
    fetchData(pageNumber - 1);
  }, [pageNumber]);

  const fetchAuctionRequestAgreed = async () => {
    if (user?.role == "MANAGER") {
      APIgetAllRequestToSession()
        .then((response) => {
          setRequestAuctionsAgreed(response?.data);
        })
        .catch((error) => {
          console.log(error);
          message.error("Something went wrong1");
        });
    }
  };
  const fetchStaff = async () => {
    APIgetallacountbyRole("STAFF")
      .then((response) => {
        var optionStaff = [];
        response.data.forEach((account) => {
          if (account.role == "STAFF") {
            optionStaff = [
              ...optionStaff,
              {
                value: account.id,
                label: `${account.id}. ${account.username}`,
              },
            ];
          }
        });
        setStaffs(optionStaff);
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
  };
  const use = async (file) => {
    try {
      const imageUrl = await uploadFile(file);
      file.url = imageUrl;
      console.log(file.url);
      setUrlJewelry((urlJewelry) => [
        ...urlJewelry,
        { path: file.url, description: "imageSession" },
      ]);
      messageApi.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      console.error("Upload failed:", error);
      messageApi.error(`${file.name} file upload failed.`);
    }
  };

  const onFinish = async (values) => {
    values.id_auction_request = currentRequestID;
    setIsOpen(false);
    if (currentId > 0) {
      console.log(urlJewelry);
      APIupdateSession(values, urlJewelry)
        .then((response) => {
          if (response.status === 200) message.success("Update Successfully");
          fetchData();
          setCurrentId(-1);
        })
        .catch((error) => {
          console.log(error);
          message.error("Something went wrong", error.response?.data);
        })
        .finally(() => {
          setIsOpen(true);
        });
    }
    if (currentId == 0) {
      // let path = urlJewelry?.map((file) => ({ path: file.url }));
      // console.log(values, path);
      APIcreateSession(values, urlJewelry)
        .then((response) => {
          if (response.status === 200) message.success("Successfully");
          setCurrentId(-1);
          fetchData();
          setUrlJewelry([]);
        })
        .catch((error) => {
          console.log(error);
          message.error("Something went wrong", error.response?.data);
        })
        .finally(() => {
          setIsOpen(true);
        });
    }
  };

  const handleSelection = (value) => {
    setCurrentRequestID(value);
  };

  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
      accept: "image/png, image/jpeg, .doc, .docx, .xml, .pdf",
    },
    onChange(info) {
      use(info.file.originFileObj);
    },
  };
  useEffect(() => {
    if (currentId === 0) {
      requestAuctionsAgreed.forEach((item) => {
        {
          if (item?.id == currentRequestID) {
            console.log(item);
            setCurrentRequest(item);
          }
        }
      });
    }

    if (currentId > 0) {
      const current_session = data.find((item) => item?.id == currentId);
      const listImage = current_session.resources.map((item) => {
        return { path: item.path };
      });
      console.log(listImage);
      setUrlJewelry(listImage);
      form.setFieldsValue({
        id_session: current_session.id,
        staff_id: current_session.staffSession.id,
        name_jewelry: current_session.nameJewelry,
        name_session: current_session.nameSession,
        description: current_session.description,
        min_stepPrice: current_session.minStepPrice,
        deposit_amount: current_session.depositAmount,
        range_time: [
          dayjs(current_session.start_time),
          dayjs(current_session.end_time),
        ],
      });
      setCurrentSession(current_session);
    } else {
      form.resetFields();
      // setUrlJewelry([]);
    }
  }, [currentId]);

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_, __, index) => {
        return (pageNumber - 1) * pageSize + index;
      },
    },
    {
      title: "Name Session",
      dataIndex: "nameSession",
      key: "nameSession",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Name Jewelry",
      dataIndex: "nameJewelry",
      key: "nameJewelry",
    },
    {
      title: "Starting Price",
      key: "price",
      render: (session) => {
        session.auctionRequest?.ultimateValuation?.price;
      },
    },
    {
      title: "Min Step Price",
      dataIndex: "minStepPrice",
      key: "minStepPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Edit",
      render: (value, record) => (
        <Button
          type="primary"
          onClick={() => {
            console.log(record.id);
            console.log();
            setCurrentId(record.id);
          }}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    fetchAuctionRequestAgreed();
    fetchStaff();
  }, []);

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",

            paddingTop: "calc(50vh - 150px)",
          }}
        />
      ) : (
        <div>
          {user?.role === "MANAGER" && (
            <Row justify={"center"} gutter={[16, 16]}>
              <p style={{ textAlign: "center" }}>Add session</p>
              <Col>
                <Select
                  placeholder="Auction RequestID"
                  allowClear
                  showSearch
                  size={"large"}
                  style={{ minWidth: 600 }}
                  listHeight={1000}
                  onSelect={handleSelection}
                >
                  {requestAuctionsAgreed?.map((request, index) => {
                    return (
                      <Select.Option key={index} value={request.id}>
                        {request.jewelryname}
                        {"   "}
                        {request.resources?.map((resource) => (
                          <Image
                            key={resource.id}
                            src={resource.path}
                            preview={false}
                            height={32}
                          />
                        ))}
                        {"   "}
                        <strong>{request?.ultimateValuation?.price}$</strong>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
              {user?.role === "MANAGER" && (
                <Button
                  type="primary"
                  onClick={() => {
                    if (currentRequestID > 0) {
                      setCurrentId(0);
                    } else {
                      message.error("Please choose session");
                    }
                  }}
                  size="large"
                >
                  Add new Session
                </Button>
              )}
            </Row>
          )}
          <Modal
            title={`${currentId > 0 ? "Edit" : "Add"} Session`}
            open={currentId >= 0 && isOpen}
            onOk={() => {
              // if (user?.role !== "MANAGER") {
              //   message.error(
              //     "You do not have permission to perform this action."
              //   );
              //   return;
              // }
              form.submit();
            }}
            onCancel={() => {
              form.resetFields();
              setCurrentId(-1);
            }}
            width={1120}
          >
            <h6>Information Request</h6>
            <Row wrap={false}>
              <Col style={{ marginBottom: "24px" }} span={8}>
                {currentId > 0 ? (
                  <>
                    <Row>
                      ID Request : {currentSession?.auctionRequest?.id}{" "}
                      <strong>Name</strong> :{" "}
                      {currentSession?.auctionRequest?.jewelryname}
                      <strong>Price</strong> :{" "}
                      {currentSession?.auctionRequest?.ultimateValuation?.price}
                    </Row>
                    {currentSession?.auctionRequest?.resources.map((item) => (
                      <>
                        <Image
                          src={item.path}
                          width={"calc(50% - 16px)"}
                          style={{
                            padding: "10px",
                          }}
                        />
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <Row>
                      {" "}
                      <strong>Name</strong> : {currentRequest?.jewelryname}{" "}
                      <strong>Price</strong> :{" "}
                      {currentRequest?.ultimateValuation?.price}
                    </Row>
                    {currentRequest?.resources.map((item) => (
                      <>
                        <Image
                          src={item.path}
                          width={"calc(50% - 16px)"}
                          style={{
                            padding: "10px",
                          }}
                        />
                      </>
                    ))}
                  </>
                )}
              </Col>

              <Col span={16}>
                <Form
                  form={form}
                  name="basic"
                  hideRequiredMark
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onValuesChange={() => {
                    form.validateFields(["startDateTime", "endDateTime"]);
                  }}
                  autoComplete="off"
                >
                  {currentId > 0 && (
                    <Form.Item label="ID Session" name="id_session">
                      <Input readOnly />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Name Session"
                    name="name_session"
                    rules={[
                      {
                        required: true,
                        message: "Please input name session!",
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Jewelry Name"
                    name="name_jewelry"
                    rules={[
                      {
                        required: true,
                        message: "Please input jewelry name!",
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input Description !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item hidden name="id_auction_request">
                    {/* <Input value={currentRequestID}></Input> */}
                  </Form.Item>

                  <Form.Item
                    label="Min Step Price"
                    name="min_stepPrice"
                    rules={[
                      {
                        required: true,
                        message: "Please input min step price!",
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  {/* <Form.Item
                    label="Deposit Amount"
                    name="deposit_amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Deposit Amount!",
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item> */}
                  <Form.Item
                    label="Staff"
                    name="staff_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input Staff ID!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a person"
                      filterOption={(input, staff) => {
                        return (staff?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                      options={staffs}
                    ></Select>
                  </Form.Item>

                  <Form.Item
                    label="Range Time"
                    name="range_time"
                    rules={[
                      {
                        required: true,
                        message: "Please input Range Time!",
                      },
                    ]}
                  >
                    <RangePicker
                      style={{ width: "100%" }}
                      disabledDate={disabledDate}
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [
                          dayjs("00:00", "HH:mm"),
                          dayjs("11:59", "HH:mm"),
                        ],
                      }}
                      format="YYYY-MM-DD HH:mm"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-conten"
                    label="Upload image "
                    name="imgjewerly"
                    // style={{display:"flex"}}
                  >
                    <Upload {...props} fileList={urlJewelry}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <div
                    style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
                  >
                    {urlJewelry?.map((file, index) => (
                      <Image
                        key={index}
                        width={"calc(33% - 16px)"}
                        src={file.path}
                      />
                    ))}
                  </div>
                </Form>
              </Col>
            </Row>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              {currentSession?.status === "BIDDING" && (
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    maxWidth: 500,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleStop}
                  autoComplete="off"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={user?.role !== "STAFF"}
                  >
                    STOP
                  </Button>
                </Form>
              )}

              {(currentSession?.status === "STOP" ||
                currentSession?.status === "EXPIRED") && (
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    maxWidth: 500,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleContinue}
                  autoComplete="off"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={user?.role !== "STAFF"}
                  >
                    CONTINUE
                  </Button>
                </Form>
              )}

              {currentSession?.status === "PENDINGPAYMENT" && (
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    maxWidth: 500,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleFinish}
                  autoComplete="off"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={user?.role !== "STAFF"}
                  >
                    FINISH
                  </Button>
                </Form>
              )}
            </div>
          </Modal>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{
              total: totalRow,
              current: pageNumber,
              pageSize: pageSize,
            }}
            size="middle"
            onChange={onChangePaging}
          />
        </div>
      )}
    </>
  );
}
