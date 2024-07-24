import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomePage from "../home-default/home";

import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";

import {
  Button,
  Row,
  Tabs,
  message,
  Form,
  InputNumber,
  Statistic,
  Modal,
  Flex,
  Col,
  Spin,
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
import BidsList from "../bidList/bidList.jsx";
dayjs.extend(duration);
export default function Detail() {
  useRealtime(async (body) => {
    if (body.body == "addBid") {
      await fetchRealTime();
    }
  });
  const params = useParams();
  const [session, setSession] = useState();
  const [highlight, setHighlight] = useState(false);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();
  const [mainImage, setMainImage] = useState(session?.resources[0]?.path);

  const { Countdown } = Statistic;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [product]);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Jewelry Details",
      children: (
        <>
          <h6>{session?.description} </h6>
          <h6>
            {" "}
            Time : {`${dayjs(session?.start_time).format("D MMMM h:mmA")}`} -
            {`${dayjs(session?.end_time).format("D MMMM h:mmA")}`}
          </h6>
        </>
      ),
    },
  ];

  const handleTab = (index) => {
    setMainImage(session?.resources[index]?.path);
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
    APIBidding(session?.id, values.bidAmount)
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
  console.log("rerender");
  const fetch = () => {
    setIsLoading(true);
    var id_user;
    if (user != null) {
      id_user = user.id;
    } else {
      id_user = -1;
    }
    APIgetSessionByID(params.id, id_user)
      .then((response) => {
        console.log(response);
        setSession(response.data);
      })
      .catch((error) => {
        navigate("/");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // APIgetAllBiddingBySessionId(params.id).then((response) => {
    //   setAuctionBids(response.data);
    // });
  };
  const fetchRealTime = () => {
    var id_user;
    if (user != null) {
      id_user = user.id;
    } else {
      id_user = -1;
    }
    APIgetSessionByID(params.id, id_user)
      .then((response) => {
        console.log(response);
        setSession(response.data);
        setHighlight(true);

        // Remove highlight after 10 seconds
        setTimeout(() => {
          setHighlight(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    // APIgetAllBiddingBySessionId(params.id).then((response) => {
    //   setAuctionBids(response.data);
    // });
  };
  useEffect(() => {
    fetch();
  }, [location]);

  useEffect(() => {
    setMainImage(() => {
      return session?.resources[0]?.path != null
        ? session?.resources[0]?.path
        : "";
    });
  }, [session]);

  // const formatTimeLeft = () => {
  //   const { days, hours, minutes, seconds } = timeLeft;
  //   return `${days || 0}d ${hours || 0}h ${minutes || 0}m ${seconds || 0}s`;
  // };
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };
  const formattedBalance = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
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
        <HomePage>
          <h2
            style={{
              color: "grey",
            }}
          >
            {session?.nameSession}
          </h2>
          <Row gutter={24} style={{ marginBottom: "10px", width: "1200px" }}>
            <Col xs={12}>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                }}
              >
                <img
                  src={mainImage && mainImage}
                  style={{
                    width: "100%",
                    maxHeight: "500px",

                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
            <Col xs={6}>
              {/* <h6
                style={{
                  color: "grey",
                }}
              >
                {" "}
                Item: {session?.id}
              </h6> */}
              <h4>{session?.nameJewelry}</h4>
              <h6>Start Price:</h6>{" "}
              <h4>
                {formattedBalance(
                  Number(session?.auctionRequest.ultimateValuation.price)
                )}
                $
              </h4>
              <h6> </h6> <h4></h4>
              <h6>Fee Amount Percent:</h6> <h4>{session?.feeAmount * 100}%</h4>
              <h6>Step Price:</h6> <h4>{session?.minStepPrice}$</h4>
              {session?.three_highestBid?.length > 0 && (
                <>
                  <h6>Highest Bid Price:</h6>{" "}
                  <h4>
                    <strong style={{ color: highlight ? "red" : "black" }}>
                      {formattedBalance(
                        Number(session?.three_highestBid[0]?.bid_price)
                      )}
                      $
                    </strong>
                  </h4>
                </>
              )}
              {/* <div>
              {Object.keys(timeLeft).length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h6>Time Left:</h6>
                  <h4>{formatTimeLeft()}</h4>
                </div>
              )}
            </div> */}
              {session?.status === "BIDDING" && (
                <>
                  <div>
                    <Countdown
                      title=" This session will finish in:"
                      style={{ fontWeight: "bold", fontSize: 32 }}
                      value={session?.end_time}
                      onFinish={() => {
                        fetch();
                      }}
                    />
                  </div>
                </>
              )}
              {session?.status === "INITIALIZED" && (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <Countdown
                      title=" This session will start in:"
                      style={{ fontWeight: "bold", fontSize: 32 }}
                      value={session?.start_time}
                      onFinish={() => {
                        fetch();
                      }}
                    />

                    {/* <h4>{formatTimeLeft()}</h4> */}
                  </div>
                </div>
              )}
              <span
                className="Request-Sell-History AuctionRules"
                style={{
                  justifyContent: "flex-start",
                  marginTop: "24px",
                  marginLeft: "0px",
                }}
                onClick={() => toggleModal(0, true)}
              >
                Buyer Regulations
              </span>
            </Col>
            <Col xs={6}>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {" "}
                {session?.three_highestBid?.length > 0 ? (
                  <>
                    <BidsList
                      bids={session?.three_highestBid}
                      idSession={params?.id}
                    />
                  </>
                ) : (
                  <strong style={{ fontSize: "24px" }}>
                    {session?.status == "FINISH"
                      ? "This session is finished"
                      : " No bids have been placed on this item yet. Be the first to bid!"}
                  </strong>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            {session?.resources.map((img, index) => {
              return (
                <img
                  src={img?.path && img?.path}
                  key={index}
                  style={{
                    height: "70px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    objectFit: "cover",
                    width: "70px",
                    marginRight: "5px",
                  }}
                  onClick={() => handleTab(index)}
                />
              );
            })}
          </Row>

          <Col xs={24}>
            <Flex
              align="center"
              justify="center"
              gap={30}
              style={{ width: "100%" }}
            >
              {session?.register ? (
                <>
                  {session?.status == "BIDDING" && (
                    <>
                      <Form onFinish={handleBidSubmit}>
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
                              min: session?.three_highestBid[0]?.bid_price,
                              message:
                                "Please input your bid amount at least " +
                                (session?.three_highestBid[0]?.bid_price +
                                  session?.minStepPrice) +
                                "$",
                            },
                            // {
                            //   validator: (rule, value) => {
                            //     const minBid =
                            //       session?.three_highestBid[0].bid_price +
                            //       session?.minStepPrice;
                            //     if (value < minBid) {
                            //       return Promise.reject(
                            //         `Bid amount must be at least ${minBid}$`
                            //       );
                            //     }
                            //     return Promise.resolve();
                            //   },
                            // },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Enter bid amount"
                            step={1}
                          />
                        </Form.Item>{" "}
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            danger
                            size="large"
                            htmlType="submit"
                            type="primary"
                            style={{ height: "40px" }}
                          >
                            Submit Bid
                          </Button>
                        </div>
                      </Form>
                    </>
                  )}

                  {session?.status == "INITIALIZED" && (
                    <p style={{ color: "blue", fontStyle: "italic" }}>
                      You have registered... awaiting auction.
                    </p>
                  )}
                </>
              ) : (
                <>
                  {(session?.status == "INITIALIZED" ||
                    session?.status == "BIDDING") && (
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
                            min:
                              session?.status == "BIDDING" &&
                              session?.three_highestBid[0]?.bid_price > 0
                                ? session?.three_highestBid[0]?.bid_price +
                                  +session?.minStepPrice
                                : session?.auctionRequest.ultimateValuation
                                    .price + session?.minStepPrice,

                            message:
                              "Please enter price higher than " +
                              (session?.status == "BIDDING" &&
                              session?.three_highestBid[0]?.bid_price > 0
                                ? session?.three_highestBid[0]?.bid_price +
                                  session?.minStepPrice
                                : session?.auctionRequest.ultimateValuation
                                    .price + session?.minStepPrice) +
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

                      <Button
                        htmlType="submit"
                        className="button-detail"
                        style={{ marginLeft: "130px" }}
                        type="primary"
                      >
                        Auction Register
                      </Button>
                    </Form>
                  )}
                </>
              )}
            </Flex>

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

                  <h3>1. Account Registration</h3>
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
                    2.3 Buyers are responsible for ensuring their bids are
                    placed correctly and cannot retract a bid once it is placed.
                  </p>
                  <p>
                    2.4 With a bid that is 50% higher than the previous bid,
                    automatically set the remaining time from 30 seconds to 1 minute 30 seconds  minutes from that
                    bid.
                    <h6>- For example: 
                    the highest order is $100, if you reach $150, the time will be automatically updated as specified above

                    </h6>
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
                    4.2 When investing, you will receive a refund after the
                    initial investment
                  </p>

                  <h2>5. Additional Regulations</h2>
                  <p>
                    5.1 Buyers must comply with the systems rules and terms.
                  </p>
                  <p>
                    5.2 The system reserves the right to change the rules and
                    fee schedule at any time and will notify users before they
                    take effect.
                  </p>
                  <p>
                    5.3 Buyers are responsible for maintaining the security of
                    their account information and are liable for any activity
                    that occurs under their account.
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
              <Col xl={24}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </Col>
            </Row>
            <Row
              className="justify-content-xl-center"
              style={{
                marginBottom: "20px",
              }}
            >
              <Col xl={24}>
                <Content
                  title="OTHER BIDDING-AUCTION"
                  btnContent="View all Sessions"
                  linkURL="/sessions"
                />
                <MyCarousel status={"BIDDING"} />
              </Col>
            </Row>
          </Col>
        </HomePage>
      )}
    </>
  );
}
