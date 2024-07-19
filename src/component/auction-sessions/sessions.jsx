import HomePage from "../../component/home-default/home.jsx";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { APIgetallSession, APIgetallSessionByName } from "../../api/api.js";

import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Spin, Input, Flex, Pagination, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import { paragraphStyle } from "../../utils/styleUtils.js";

export default function AuctionSession() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [totalRow, setTotalRow] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (page) => {
    setIsLoading(true);
    const name = searchParams.get("search");

    name !== null
      ? APIgetallSessionByName(name)
        .then((response) => {
          console.log(response);
          setData(response.data.content);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        })
      : APIgetallSession(page, 3)
        .then((response) => {
          console.log(response);
          setTotalRow(response.data?.totalItems);
          setData(response.data?.items);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

  };
  const onChangePaging = (page) => {
    setPageNumber(page);
  };
  useEffect(() => {
    console.log(pageNumber);
    fetchData(pageNumber - 1);
  }, [pageNumber]);
  
  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const { Search } = Input;
  const onSearch = (value) => {
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
              {data?.length > 0 ? (
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
              ) : (
                <>
                  <p>There is no session at the moment</p>
                </>
              )}
             <Pagination
                current={pageNumber}
                total={totalRow}
                pageSize={3}
                onChange={onChangePaging}
              />
            </>
          )}
        </Flex>
      </HomePage>
    </>
  );
}
