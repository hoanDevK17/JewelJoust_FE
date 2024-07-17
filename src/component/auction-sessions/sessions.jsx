import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { APIgetallSession, APIgetallSessionByName } from "../../api/api.js";

import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Spin, Input, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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

    name !== null
      ? APIgetallSessionByName(name)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          })
      : APIgetallSession()
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const { Search } = Input;
  const onSearch = (value, _e, info) => {
    const searchUrl = `/sessions?search=${encodeURIComponent(value)}`;
    navigate(searchUrl);
  };

  return (
    <>
      <HomePage>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Search
            placeholder="Search Session or Jewelry"
            onSearch={onSearch}
            size="middle"
            style={{ width: 400, marginBottom: "20px" }}
          />
        </div>

        <Flex justify="flex-start" gap={30} wrap>
          {isLoading ? (
            <Spin
              style={{
                height: "100vh",
                width: "100%",
                backgroundColor: "#fff9e8",
                paddingTop: "50vh",
              }}
            />
          ) : (
            <>
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
                            {dayjs(session.start_time).format("D MMMM h:mmA")} -
                            {dayjs(session.end_time).format("D MMMM h:mmA")}
                            <br />
                            {session.description}
                          </p>
                          <Button
                            type="primary"
                            danger={session.status === "BIDDING"}
                            onClick={() => navigate(`/detail/${session.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      }
                    />
                  </Card>
                );
              })}
            </>
          )}
        </Flex>
      </HomePage>
    </>
  );
}
