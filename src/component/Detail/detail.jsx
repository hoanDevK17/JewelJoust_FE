import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../share-data/productData";
import HomePage from "../home-default/home";
import Footer from "../../component/footer/footer.jsx";
import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
import { Col, Container } from "react-bootstrap";
import { Row, Tabs } from "antd";
import { Typography } from "@mui/material";
export default function Detail() {
  const navigate = useNavigate();
  const userName = useParams();
  const product = Products.find((obj) => {
    return obj.id == userName.id;

  });
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Jewelry Details',
      children: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },]
  const [mainImage, setMainImage] = useState(product.image[0]);
  let price = product.price.toLocaleString();
  let profileCost = product.profileCost.toLocaleString();
  let jump = product.jump.toLocaleString();
  let depositFee = product.depositFee.toLocaleString();
  const handleTab = (index) => {
    setMainImage(product.image[index]);
  };

  return (
    <div>
      <HomePage>
        <Container fluid >
          <Row className="justify-content-xl-center">
            <Col xl={1}>
              {product.image.map((img, index) => (
                <img src={img} key={index} style={{
                  width: "80%",
                  height: "70px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
                  onClick={() => handleTab(index)}
                />
              ))}
            </Col>
            <Col xl={6} >
              <img src={mainImage} style={{
                width: "100%",
                height: "600px"
              }}
              />
            </Col>
            <Col xl={4} style={{
              marginLeft: "20px"
            }}>
              <h6 style={{
                color: "grey"
              }}> Item: {product.id}</h6>
              <h4>{product.name}</h4>
              <h6>Initial Price:</h6> <h4>{price}$</h4>
              <h6>Selling Time:</h6> <h4>{product.sellTime}</h4>
              <h6>Deposit Time:</h6> <h4>{product.afterTime}</h4>
              <h6>Profile Cost:</h6> <h4>{profileCost}$</h4>
              <h6>Deposit Fee:</h6> <h4>{depositFee}$</h4>
              <h6>Auction Form:</h6> <h4>{product.hinhThuc}</h4>
              <h6>Leap:</h6> <h4>{jump}$</h4>
              <div className="button-outside">
                <Link to={`/RegisterAuction`}>
                  <h6>
                    <button className="button-detail">Auction Register</button>
                  </h6>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-xl-center" style={{
            marginBottom: "20px",
            marginTop: "40px",
          }}>
            <Col xl={11}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Col>
          </Row>
          <Row className="justify-content-xl-center" style={{
            marginBottom: "20px"
          }}>
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
