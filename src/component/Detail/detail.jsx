import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomePage from "../home-default/home";
import Footer from "../../component/footer/footer.jsx";
import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
import { Col, Container } from "react-bootstrap";
import { Button, Row, Tabs, message, Form, InputNumber } from "antd";
import {
  APIBidding,
  APIgetSessionByID,
  APIRegistrations,
} from "../../api/api.js";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice.js";
import useRealtime from "../../assets/hook/useRealTime.jsx";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
export default function Detail() {

  useRealtime(async (body) => {
    if (body.body == "addBid") {
      await fetch();
    }
  });
  const params = useParams();
  const [product, setProduct] = useState();
  const user = useSelector(selectUser);
  let location = useLocation();
  const [mainImage, setMainImage] = useState(product?.resources[0]?.path);
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const targetTime = product?.status === "BIDDING" ? dayjs(product?.end_time) : dayjs(product?.start_time);
    const now = dayjs();
    const diff = targetTime.diff(now);

    if (diff <= 0) {
      return {};
    }

    const duration = dayjs.duration(diff);
    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Jewelry Details",
      children: <h6>{product?.description}</h6>,
    },
  ];

  const handleTab = (index) => {
    setMainImage(product?.resources[index]?.path);
  };

  const handleRegisAuction = (values) => {
    if (user != null) {
      APIRegistrations(params.id, values.bidAmount)
        .then((response) => {
          console.log(response);
          message.success(
            "Registration for the auction session was successful. Thank you for registering!"
          );
        })
        .catch((error) => {
          console.log(error);
          message.error(error?.response?.data);
        });
    } else {
      message.error("You need to login to register for the auction session");
    }
  };

  const handleBidSubmit = (values) => {
    APIBidding(product?.id, values.bidAmount)
      .then((response) => {
        console.log(response);
        message.success("Successfully bidding for the auction session");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data);
      });
  };

  const fetch = () => {
    var id_user;
    if (user != null) {
      id_user = user.id;
    } else {
      id_user = -1;
    }
    APIgetSessionByID(params.id, id_user)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, [location]);

  useEffect(() => {
    setMainImage(() => {
      return product?.resources[0]?.path != null
        ? product?.resources[0]?.path
        : "";
    });
  }, [product]);

  const formatTimeLeft = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    return `${days || 0}d ${hours || 0}h ${minutes || 0}m ${seconds || 0}s`;
  };

  return (
    <div>
      <HomePage>
        <Container fluid>
          <Row className="justify-content-xl-center">
            <Col xl={1}>
              {product?.resources.map((img, index) => {
                return (
                  <img
                    src={img?.path && img?.path}
                    key={index}
                    style={{
                      width: "90%",
                      height: "70px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    onClick={() => handleTab(index)}
                  />
                );
              })}
            </Col>
            <Col xl={6}>
              <img
                src={mainImage && mainImage}
                style={{
                  maxWidth: "800px",
                  width: "100%",
                  maxHeight: "800px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col
              xl={4}
              style={{
                marginLeft: "20px",
              }}
            >
              <h6
                style={{
                  color: "grey",
                }}
              >
                {" "}
                Item: {product?.id}
              </h6>
              <h4>{product?.nameJewelry}</h4>
              <h6>Start Price:</h6>{" "}
              <h4>{product?.auctionRequest.ultimateValuation.price}$</h4>
              <h6>Start Time:</h6>
              <h4>{dayjs(product?.start_time).format("HH:mm ")}{dayjs(product?.start_time).format(" DD-MM-YYYY")}</h4>
              <h6>End Time:</h6>
              <h4>{dayjs(product?.end_time).format("HH:mm ")}{dayjs(product?.end_time).format(" DD-MM-YYYY")}</h4>
              <h6>Profile Cost:</h6> <h4>{product?.feeAmount}$</h4>
              <h6>Step Price:</h6> <h4>{product?.minStepPrice}$</h4>
              <h6>Deposit Fee:</h6> <h4>{product?.depositAmount}$</h4>
              <h6>Highest Bid Price:</h6> <h4>{product?.highestPrice}$</h4>

              {/* <div>
                {Object.keys(timeLeft).length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h6>Time Left:</h6>
                    <h4>{formatTimeLeft()}</h4>
                  </div>
                )}
              </div> */}
              {product?.status === "BIDDING" && (
                <>
                  <div>
                    {Object.keys(timeLeft).length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <h6>This session will end in:</h6>
                        <h4>{formatTimeLeft()}</h4>
                      </div>
                    )}
                  </div>
                </>
              )} 
              {product?.status ==="INITIALIZED" &&(
                <div>
                  {Object.keys(timeLeft).length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <h6>This session will start in:</h6>
                      <h4>{formatTimeLeft()}</h4>
                    </div>
                  )}
                </div>
              )}
              <div className="button-outside">
                {product?.register ? (
                  <>
                    {product.status == "BIDDING" && (
                      <>
                        <Form onFinish={handleBidSubmit}>
                          <Form.Item
                            label={
                              <span
                                style={{ fontWeight: "bold", fontSize: 16 }}
                              >
                                Bid Amount ($)
                              </span>
                            }
                            name="bidAmount"
                            style={{
                              width: 500,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Please input your bid amount!",
                              },
                            ]}
                          >
                            <InputNumber
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Enter bid amount"
                              min={
                                product?.auctionRequest.ultimateValuation.price
                              }
                              step={1}
                            />
                          </Form.Item>{" "}
                          <Button
                            size="large"
                            htmlType="submit"
                            type="primary"
                            style={{ marginTop: "10px" }}
                          >
                            Submit Bid
                          </Button>
                        </Form>
                      </>
                    )}

                    {product.status == "INITIALIZED" && (
                      <p style={{ color: "blue", fontStyle: "italic" }}>
                        You have registered... awaiting auction.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {(product?.status == "INITIALIZED" ||
                      product?.status == "BIDDING") && (
                        <Form onFinish={handleRegisAuction}>
                          <Form.Item
                            label={
                              <span style={{ fontWeight: "bold", fontSize: 16 }}>
                                Bid Amount ($)
                              </span>
                            }
                            name="bidAmount"
                            style={{
                              width: 500,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Please input your bid amount!",
                              },
                              {
                                type: "number",
                                min: product?.auctionRequest.ultimateValuation
                                  .price,
                                message:
                                  "Please enter price higher than " +
                                  product?.auctionRequest.ultimateValuation
                                    .price +
                                  "$",
                              },
                            ]}
                          >
                            <InputNumber
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Enter bid amount"
                              min={0}
                              step={1}
                            />
                          </Form.Item>
                          <Button htmlType="submit" className="button-detail">
                            Auction Register
                          </Button>
                        </Form>
                      )}
                  </>
                )}
                {(product?.status == "FINISH" ||
                  product?.status == "PENDINGPAYMENT") && (
                    <p style={{ color: "blue", fontStyle: "italic" }}>
                      This session is finished
                    </p>
                  )}
              </div>
            </Col>
          </Row>
          <Row
            className="justify-content-xl-center"
            style={{
              marginBottom: "20px",
              marginTop: "40px",
            }}
          >
            <Col xl={11}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Col>
          </Row>
          <Row
            className="justify-content-xl-center"
            style={{
              marginBottom: "20px",
            }}
          >
            <Col xl={11}>
              <MyCarousel />
            </Col>
          </Row>
        </Container>
        <Footer />
      </HomePage>
    </div>
  );
}
