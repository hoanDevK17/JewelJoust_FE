import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomePage from "../home-default/home";

import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
import { Col, Container } from "react-bootstrap";
import {
  Button,
  Row,
  Tabs,
  message,
  Form,
  InputNumber,
  Statistic,
  Modal,
} from "antd";
import {
  APIBidding,
  APIgetSessionByID,
  APIrefreshBalance,
  APIRegistrations,
} from "../../api/api.js";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshBalance,
  selectUser,
} from "../../redux/features/counterSlice.js";
import useRealtime from "../../assets/hook/useRealTime.jsx";
import duration from "dayjs/plugin/duration";
import Content from "../content/content.jsx";
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

  const { Countdown } = Statistic;
  const calculateTimeLeft = () => {
    const targetTime =
      product?.status === "BIDDING"
        ? dayjs(product?.end_time)
        : dayjs(product?.start_time);
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
  const dispatch = useDispatch();
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
      children: (
        <>
          <h6>{product?.description} </h6>
          <h6>
            {" "}
            Time : {`${dayjs(product?.start_time).format("D MMMM h:mmA")}`} -
            {`${dayjs(product?.end_time).format("D MMMM h:mmA")}`}
          </h6>
        </>
      ),
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
        APIrefreshBalance().then((rs) => {
          if (rs.status === 200) {
            // user.wallet.balance = JSON.stringify(rs.data);
            dispatch(refreshBalance(rs.data));
          }
        });
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
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
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
                  height:"500px",
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
              <h6
                style={{
                  color: "grey",
                }}
              >
                {" "}
                Session: {product?.nameSession}
              </h6>
              <h4>{product?.nameJewelry}</h4>
              <h6>Start Price:</h6>{" "}
              <h4>{product?.auctionRequest.ultimateValuation.price}$</h4>
              <h6> </h6> <h4></h4>
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
              {product?.status === "INITIALIZED" && (
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

          <span
            className="Request-Sell-History AuctionRules"
            onClick={() => toggleModal(0, true)}
          >
            Buyer Regulations
          </span>
          <Modal
            style={{ marginTop: "0" }}
            open={isModalOpen[0]}
            onOk={() => toggleModal(0, false)}
            onCancel={() => toggleModal(0, false)}
            footer=" "
            width={"fit-content"}
          >
            <>
              <div className="container">
                <h1>Buyer Regulations</h1>

                <h2>1. Account Registration</h2>
                <p>
                  1.1 Buyers must create an account and provide verification
                  information before participating in an auction.
                </p>
                <p>
                  1.2 Buyers must provide accurate and complete personal
                  information during registration.
                </p>

                <h2>2. Bidding Process</h2>
                <p>
                  2.1 Buyers can place bids on products through the auction
                  interface.
                </p>
                <p>
                  2.2 Each bid must be at least the minimum increment higher
                  than the current bid.
                </p>
                <p>
                  2.3 Buyers are responsible for ensuring their bids are placed
                  correctly and cannot retract a bid once it is placed.
                </p>

                <h2>3. Winning an Auction</h2>
                <p>
                  3.1 The buyer with the highest bid at the end of the auction
                  will be declared the winner.
                </p>
                

                <h2>4. Payment and Transaction Fees</h2>
                <p>
                  4.1 Buyers must pay for the auction item using one of the
                  accepted payment methods.
                </p>
                <p>
                4.2 When investing, you will receive a refund after the initial investment
                </p>
               

                

                <h2>5. Additional Regulations</h2>
                <p>5.1 Buyers must comply with the systems rules and terms.</p>
                <p>
                  5.2 The system reserves the right to change the rules and fee
                  schedule at any time and will notify users before they take
                  effect.
                </p>
                <p>
                  5.3 Buyers are responsible for maintaining the security of
                  their account information and are liable for any activity that
                  occurs under their account.
                </p>
              </div>
            </>
          </Modal>

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
              <Content
                title="PRE-AUCTION"
                btnContent="View all Sessions"
                linkURL="/sessions"
              />
              <MyCarousel />
            </Col>
          </Row>
        </Container>
      </HomePage>
    </div>
  );
}
