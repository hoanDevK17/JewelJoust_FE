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
      <HomePage>


        <Container fluid >
          <Row className="justify-content-xl-center">
            <Col xl={11}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Session </TableCell>
                        <TableCell align="right">Jewelry </TableCell>
                        <TableCell align="right">Initial price</TableCell>
                        <TableCell align="right">Start time</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((session, index) => (
                   
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="session">
                            {session.nameSession}
                          </TableCell>
                          <TableCell align="right">{session.auctionRequest.jewelryname}</TableCell>
                          <TableCell align="right">{session.auctionRequest.ultimateValuation.price}$</TableCell>
                          <TableCell align="right">{session.start_time}</TableCell>
                          <TableCell align="right">{session.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </HomePage>
    </>

  )
}
