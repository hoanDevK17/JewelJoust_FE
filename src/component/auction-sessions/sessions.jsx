import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import {
  APIgetallSession,
  APIgetallSessionByName,
  APIgetallSessionByStatus,
} from "../../api/api.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Card, Flex, Spin } from "antd";
import { FireOutlined, LoadingOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import { paragraphStyle } from "../../utils/styleUtils.js";

export default function AuctionSession() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const fetchData = async () => {
    setIsLoading(true);
    const name = searchParams.get("search");
    // console.log(name);

    name !== null
      ? APIgetallSessionByName(name)
          .then((response) => {
            console.log(response);
            setData(response.data);
            setIsLoading(false);
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          })
      : APIgetallSession(name)
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
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ) : (
        <HomePage>
          <Flex justify="flex-start" gap={30} wrap>
            {data?.map((session, index) => {
              return (
                <Card
                  key={index}
                  hoverable
                  style={{ width: "calc(33.33% - 20px)" }}
                  cover={
                    <img
                      height={300}
                      alt="example"
                      src={session.resources[0]?.path}
                    />
                  }
                >
                  <Meta
                    title={session.nameSession}
                    description={
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                        >
                          <strong style={{ fontSize: "20px", color: "black" }}>
                            {session?.auctionRequest.ultimateValuation.price}$
                          </strong>
                          <p style={paragraphStyle}>
                            {" "}
                            {dayjs(session.start_time).format("D MMMM h:mmA")} -
                            {dayjs(session.end_time).format("D MMMM h:mmA")}
                            <br />
                            {session.description}
                          </p>
                          <Button
                            type="primary"
                            danger={session.status === "BIDDING"}
                            onClick={() => {
                              navigate(`/detail/${session.id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </>
                    }
                  />
                </Card>
              );
            })}
          </Flex>
        </HomePage>
      )}
    </>
  );
}
