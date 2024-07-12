import React, { useEffect, useState } from "react";
import { Products } from "../../share-data/productData";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import HomePage from "../../component/home-default/home";
import Footer from "../../component/footer/footer.jsx";
import { useParams } from "react-router-dom";
import { APIgetSessionByID } from "../../api/api.js";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice.js";
export default function Bidding() {
  const product = Products.find((obj) => {
    return obj.id == 1;
  });
  const [mainImage, setMainImage] = useState(product.image[0]);
  const handleTab = (index) => {
    setMainImage(product.image[index]);
  };
  let price = product.price.toLocaleString();
  let jump = product.jump.toLocaleString();
  const user = useSelector(selectUser);
  const [highestBid, setHighestBid] = useState(product.price);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [bids, setBids] = useState([]);
  const [data, setData] = useState();
  const params = useParams();
  const bidValid = () => {
    highestBid + jump;
  };
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);
    if (isNaN(bid) || bid <= highestBid || bid > bidValid) {
      setError(
        `Bid must be greater than the current highest bid of ${highestBid.toLocaleString()}$`
      );
    } else {
      setHighestBid(bid);
      setBids([
        ...bids,
        { amount: bid, timestamp: new Date().toLocaleString() },
      ]);
      setError("");
      console.log(bid);
      setBidAmount("");
    }
  };

  const fetchData = async () => {
    var id_user;
    if (user != null) {
      id_user = user.id;
    } else {
      id_user = -1;
    }
    APIgetSessionByID(params?.id, id_user).then((response) => {
      console.log(response);
      setData(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  //   const Thumbnail = styled.img`
  //   width: 70%;
  //   max-width: 100%;
  //   height: auto;
  //   margin-bottom: 10px;
  //   border-radius: 8px;
  //   cursor: pointer;
  //   object-fit: cover;

  //   @media (max-width: 768px) {
  //     width: 50%;
  //     margin-bottom: 8px;
  //   }

  //   @media (max-width: 480px) {
  //     width: 30%;
  //     margin-bottom: 5px;
  //   }
  // `;
  return (
    <HomePage>
      <Container fluid style={{ marginBottom: "20px" }}>
        <Row
          className="justify-content-xl-center"
          style={{ justifyContent: "center" }}
        >
          <Col xl={1}>
            {product.image.map((img, index) => (
              <img
                src={img}
                key={index}
                style={{
                  width: "70%",
                  maxWidth: "20vw",
                  height: "50px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => handleTab(index)}
              />
            ))}
          </Col>
          <Col xl={5}>
            <img
              src={mainImage}
              style={{
                maxWidth: "800px",
                width: "100%",
                maxHeight: "800px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col xl={3}>
            <h4>{product.name}</h4>
            <h6>Initial Price:</h6> <h4>{price}$</h4>
            <h6>Leap:</h6> <h4>{jump}$</h4>
            <Form onSubmit={handleBidSubmit}>
              <Form.Group controlId="bidAmount">
                <Form.Control
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={handleBidChange}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Submit Bid
              </Button>
            </Form>
          </Col>
          <Col xl={3}>
            <Table striped bordered hover>
              <tbody>
                {[...bids]
                  .sort((a, b) => b.amount - a.amount)
                  .map((bid, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bid.amount.toLocaleString()}$</td>
                      <td>{bid.timestamp}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </HomePage>
  );
}
