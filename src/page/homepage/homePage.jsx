import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";
import "./body.scss";
import Content from "../../component/content/content.jsx";

import MyCarousel from "../../component/carousel/Carousel.jsx";

import { Col, } from "react-bootstrap";

import { APIgetallSessionByStatus } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

import { Flex, Input } from "antd";
import CarouselAntd from "../../component/carouselAntd/carouselAntd.jsx";
export default function Home() {
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value, "search");

    // Construct the URL with the search query parameter
    const searchUrl = `/sessions?search=${encodeURIComponent(value)}`;
    // Redirect to the constructed URL
    navigate(searchUrl);
  };
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
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
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
        <MyCarousel status={"BIDDING"} />
        <Content title="PRE-AUCTION" />

        <MyCarousel status={"INITIALIZED"} />
      </Col>
    </HomePage>
  );
}
