import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";
import "./body.scss";
import Content from "../../component/content/content.jsx";

import CardItem from "../../component/card/card.jsx";
import MyCarousel from "../../component/carousel/Carousel.jsx";

import { Col, Container, Row } from "react-bootstrap";
import { ContainerFilled, LoadingOutlined } from "@ant-design/icons";
import { APIgetallSessionByStatus } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Flex, Input, Space, Spin } from "antd";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CarouselAntd from "../../component/carouselAntd/carouselAntd.jsx";
export default function Home() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { Search } = Input;
  const fetchData = async () => {
    setIsLoading(true);
    APIgetallSessionByStatus("EXPIRED")
      .then((response) => {
        console.log(response);
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <HomePage>
        <Col xl={12}>
          <Flex justify="space-between" style={{ marginBottom: "24px" }}>
            <div>
              <h2>JEWELJOUST!</h2>
              <h6 style={{ fontSize: 14 }}>
                Your Ultimate Destination for Exciting Auctions
              </h6>
            </div>
            <Search
              placeholder="Search Session or Jewelry"
              onSearch={onSearch}
              size="middle"
              // width={200}
              style={{
                width: 400,
              }}
            />
          </Flex>
          <CarouselAntd />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "24px",
            }}
          ></div>
          <Content
            title="AUCTION BIDDING"
            btnContent="View all sessions"
            linkURL="/sessions"
          />
          <MyCarousel status={"EXPIRED"} />
          <Content title="PRE-AUCTION" />
          <div></div>
          <MyCarousel status={"EXPIRED"} />
        </Col>  
      </HomePage>
    </div>
  );
}
