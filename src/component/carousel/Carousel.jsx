import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./carousel.scss";
import { useNavigate } from "react-router-dom";
import { Button, Card, Carousel, Col, Flex, Row, Spin } from "antd";
import { APIgetallSessionByStatus } from "../../api/api";
import dayjs from "dayjs";
import { FireOutlined } from "@ant-design/icons";
import { paragraphStyle } from "../../utils/styleUtils";
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function MyCarousel({ status }) {
  const navigate = useNavigate();
  const settings = {
    dots: false,
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
  const { Meta } = Card;
  const fetchData = async () => {
    setIsLoading(true);
    APIgetallSessionByStatus(status)
      .then((response) => {
        console.log(response);
        // handle data to show

        setData(chunkArray(response.data, 3));
        setIsLoading(false);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <Spin />
        </div>
      ) : data?.length > 0 ? (
        <div className="slider-container">
          <Carousel arrows={true}>
            {data?.map((items3, index3) => (
              <div key={index3}>
                <Flex justify="center" gap={30}>
                  {items3.map((session, index) => (
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
                              <strong
                                style={{ fontSize: "20px", color: "black" }}
                              >
                                {
                                  session?.auctionRequest.ultimateValuation
                                    .price
                                }
                                $
                              </strong>
                              <p style={paragraphStyle}>
                                {" "}
                                {dayjs(session.start_time).format(
                                  "D MMMM h:mmA"
                                )}{" "}
                                -
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
                                {session.status === "BIDDING" ? (
                                  <>
                                    Bidding Now <FireOutlined />
                                  </>
                                ) : (
                                  "Register Auction"
                                )}
                              </Button>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  ))}
                </Flex>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div>There is no available product at the moment</div>
      )}
    </>
  );
}
