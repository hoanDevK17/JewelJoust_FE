
import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import { APIgetallSessionByStatus } from "../../api/api.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
export default function AuctionSession() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <>
      <HomePage>
        <Container fluid style={{ marginBottom: "20px" }}>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              color: "gray",
              marginBottom: "10px",
            }}
          >
            Jewelry Auction Sessions
          </h2>
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
                        <TableCell align="right">
                          {session.auctionRequest.jewelryname}
                        </TableCell>
                        <TableCell align="right">
                          {session.auctionRequest.ultimateValuation.price}$
                        </TableCell>
                        <TableCell align="right">
                          {dayjs(session.start_time).format("YYYY-MM-DD HH-mm")}
                        </TableCell>
                        <TableCell align="right">{session.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
        </Container>
      </HomePage>
    </>
  );
}
