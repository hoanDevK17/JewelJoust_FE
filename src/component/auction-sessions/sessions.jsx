import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from 'react';
import Content from "../../component/content/content.jsx";
import Search from "antd/es/transfer/search.js";
import CardItem from "../../component/card/card.jsx";
import MyCarousel from "../../component/carousel/Carousel.jsx";
import HeadCarousel from "../../component/header-carousel/headCarousel.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { ContainerFilled } from "@ant-design/icons";
import { APIgetallSessionByStatus } from "../../api/api.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function AuctionSession() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true)
    APIgetallSessionByStatus("INITIALIZED").then((response) => {
      console.log(response);
      setData(response.data);
      setIsLoading(false);
      console.log(data)
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
    </>

  )
}
