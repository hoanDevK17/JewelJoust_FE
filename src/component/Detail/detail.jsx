import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../share-data/productData";
import HomePage from "../home-default/home";
import Footer from "../../component/footer/footer.jsx";
import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
import { Col, Container } from "react-bootstrap";
import { Button, Row, Tabs, message } from "antd";
import { APIgetSessionByID, APIregisSession } from "../../api/api.js";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
export default function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState();
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
      children:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
  ];
  const [mainImage, setMainImage] = useState(
    product?.auctionRequest?.resources[0].path
  );
  // let price = product.price.toLocaleString();
  // let profileCost = product.profileCost.toLocaleString();
  // let jump = product.jump.toLocaleString();
  // let depositFee = product.depositFee.toLocaleString();
  const handleTab = (index) => {
    setMainImage(product?.auctionRequest?.resources[index].path);
  };
  const handleRegisAuction = () => {
    APIregisSession(params.id)
      .then((response) => {
        message.success(
          "Registration for the auction session was successful. Thank you for registering!"
        );
      })
      .catch((error) => {
        message.error(error?.response?.data);
      })
      .finally(() => {});
  };
  useEffect(() => {
    APIgetSessionByID(params.id)
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
    setMainImage(product?.auctionRequest?.resources[0].path);
  }, [product]);
  console.log(mainImage);
  return (
    <div>
      <HomePage>
        <Container fluid>
          <Row className="justify-content-xl-center">
            <Col xl={1}>
              {product?.auctionRequest?.resources.map((img, index) => {
                return (
                  <img
                    src={img.path}
                    key={index}
                    style={{
                      width: "200px",
                      height: "200px",
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
                src={mainImage}
                style={{
                  maxWidth: "800px",
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
              <h6>
                Start Time:
                {dayjs(product?.start_time).format("YYYY-MM-DD HH-mm")}
              </h6>
              <h6>
                End Time: {dayjs(product?.end_time).format("YYYY-MM-DD HH-mm")}$
              </h6>
              <h6>Profile Cost:</h6> <h4></h4>
              <h6>Deposit Fee:</h6> <h4>{product?.feeAmount}$</h4>
              {/* <h6>Auction Form:</h6> <h4>{product?.hinhThuc}</h4> */}
              {/* <h6>Leap:</h6> <h4>{jump}$</h4> */}
              <div className="button-outside">
                <Button onClick={handleRegisAuction}>
                  <h6>
                    <button className="button-detail">Auction Register</button>
                  </h6>
                </Button>
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
