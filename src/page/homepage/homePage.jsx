import Footer from "../../component/footer/footer.jsx";
import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";
import "./body.scss";
import Content from "../../component/content/content.jsx";
import Search from "antd/es/transfer/search.js";
import CardItem from "../../component/card/card.jsx";
import MyCarousel from "../../component/carousel/Carousel.jsx";
import HeadCarousel from "../../component/header-carousel/headCarousel.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { ContainerFilled } from "@ant-design/icons";
import { APIgetallSessionByStatus } from "../../api/api.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function Home() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    setIsLoading(true);
    APIgetallSessionByStatus("PENDINGPAYMENT")
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
        <Container fluid style={{marginBottom:"30px"}}>
          <Row className="justify-content-xl-center">
            <Col xl={11}>
              {/* Sang code chỗ này nha */}
              <HeadCarousel />
              <Content
                title="AUCTION BIDDING"
                btnContent="View all sessions"
                linkURL="/sessions"
              />
              <div className="table">
                {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align={"left"}>Session </TableCell>
                        <TableCell align="left">Jewelry </TableCell>
                        <TableCell align="left">Initial price</TableCell>
                        <TableCell align="left">Time</TableCell>
                        <TableCell align="left">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((session, index) => (
                        <TableRow
                          hover
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => {
                            navigate(`/detail/${session.id}`);
                          }}
                        >
                          <TableCell component="th" scope="session">
                            {session.nameSession}
                          </TableCell>
                          <TableCell align="left">
                            {session.auctionRequest.jewelryname}
                          </TableCell>
                          <TableCell align="left">
                            {session.auctionRequest.ultimateValuation.price}$
                          </TableCell>
                          <TableCell align="left">
                            {`${dayjs(session.start_time).format(
                              "D MMMM h:mmA"
                            )} -
                              ${dayjs(session.end_time).format(
                                "D MMMM h:mmA"
                              )}`}
                          </TableCell>
                          <TableCell align="left">{session.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <Content title="PRE-AUCTION" />
              <div></div>
              <MyCarousel />
              {/* <div>
                <Content
                  title="Blogs"
                  btnContent="View all blogs"
                  linkURL={""}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                <CardItem img="data:image/jpeg;base64,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" />
                <CardItem />
                <CardItem />
                <CardItem />
              </div> */}
            </Col>
          </Row>
        </Container>
      </HomePage>
    </div>
  );
}
