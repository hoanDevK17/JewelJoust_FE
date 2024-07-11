import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../share-data/productData";
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
export default function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState();
  const user = useSelector(selectUser);
  // const product = Products.find((obj) => {
  //   return obj.id == userName.id;
  // });
  let location = useLocation();
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
  const [mainImage, setMainImage] = useState(product?.resources[0]?.path);
  // let price = product.price.toLocaleString();
  // let profileCost = product.profileCost.toLocaleString();
  // let jump = product.jump.toLocaleString();
  // let depositFee = product.depositFee.toLocaleString();
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
        })
        .finally(() => {});
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
      })
      .finally(() => {});
  };
  useEffect(() => {
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
      })
      .finally(() => {});
  }, [location]);

  useEffect(() => {
    setMainImage(() => {
      return product?.resources[0]?.path != null
        ? product?.resources[0]?.path
        : "";
    });
  }, [product]);
  console.log(mainImage);
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
              <h4> {dayjs(product?.start_time).format("YYYY-MM-DD HH-mm")}</h4>
              <h6>End Time:</h6>
              <h4>{dayjs(product?.end_time).format("YYYY-MM-DD HH-mm")}</h4>
              <h6>Profile Cost:</h6> <h4>{product?.feeAmount}$</h4>
              <h6>Step Price:</h6> <h4>{product?.minStepPrice}$</h4>
              <h6>Deposit Fee:</h6> <h4>{product?.depositAmount}$</h4>
              <h6>Highest Bid Price:</h6> <h4>{product?.highestPrice}$</h4>
              {/* <h6>Auction Form:</h6> <h4>{product?.hinhThuc}</h4> */}
              {/* <h6>Leap:</h6> <h4>{jump}$</h4> */}
              <div className="button-outside">
                {/* <Button onClick={handleRegisAuction}className="button-detail">
                  <h6>
                   Auction Register
                  </h6>
                </Button> */}

                {product?.register ? (
                  <>
                    {product.status == "BIDDING" ? (
                      <>
                        {" "}
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
                    ) : (
                      <>
                        <p style={{ color: "blue", fontStyle: "italic" }}>
                          You have registered... awaiting auction.
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
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
                              product?.auctionRequest.ultimateValuation.price +
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
                  </>
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
