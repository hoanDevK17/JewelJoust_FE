import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./carousel.scss";
import { Products } from "../../share-data/productData";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Space, Spin, Typography } from "antd";
import { APIgetallSessionByStatus } from "../../api/api";
import { Col, Container, Row } from "react-bootstrap";
import { LoadingOutlined } from "@ant-design/icons";

export default function MyCarousel() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
    ],
  };
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true)
    APIgetallSessionByStatus("INITIALIZED").then((response) => {
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error)
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <Row className="justify-content-xl-center">
            <Col xl={1}>
            <Space>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Space>
            </Col>
          </Row>
        </Container>
      ) : data?.length > 0 ? (
        <div className="slider-container">
          <Slider {...settings}>
            {data?.map((session, index) => {
              return (
                <div
                  className="cards"
                  key={index}
                  onClick={() => {
                    console.log("oke");
                    navigate(`/detail/${session.id}`);
                  }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={session.auctionRequest.resources[0]?.path}
                        alt="session image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h1" component="div">
                          {session.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {session.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div>There is no available product at the moment</div>
      )}

    </>
  );
}
