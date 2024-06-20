import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../share-data/productData";
import HomePage from "../home-default/home";
import Footer from "../../component/footer/footer.jsx";
import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
import { Col, Container } from "react-bootstrap";
import { Row } from "antd";
export default function Detail() {
  const navigate = useNavigate();
  const userName = useParams();
  const product = Products.find((obj) => {
    return obj.id == userName.id;

  });
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
              <h1 style={{
                color: "grey"
              }}> Item: {product.id}</h1>
              <h4>{product.name}</h4>
              <h1>Initial Price:</h1> <h4>{price}$</h4>
              <h1>Selling Time:</h1> <h4>{product.sellTime}</h4>
              <h1>Deposit Time:</h1> <h4>{product.afterTime}</h4>
              <h1>Profile Cost:</h1> <h4>{profileCost}$</h4>
              <h1>Deposit Fee:</h1> <h4>{depositFee}$</h4>
              <h1>Auction Form:</h1> <h4>{product.hinhThuc}</h4>
              <h1>Leap:</h1> <h4>{jump}$</h4>
              <div className="button-outside">
                <Link to={`/RegisterAuction`}>
                  <h1>
                    <button className="button-detail">Auction Register</button>
                  </h1>
                </Link>
              </div>
            </Col>
          </Row>
          <MyCarousel />
        </Container>
        <Footer />
      </HomePage>



    </div>

  );
}
