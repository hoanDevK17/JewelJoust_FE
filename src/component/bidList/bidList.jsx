import { Modal, Spin } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { APIgetAllBidding, APIgetAllBiddingBySessionId } from "../../api/api";

const BidsList = ({ bids, idSession }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(bids);
  if (bids.length >= 3) {
    bids = bids.slice(0, 3);
  }
  const fetch = async () => {
    setIsLoading(true);
    APIgetAllBiddingBySessionId(idSession)
      .then((rs) => {
        setData(rs.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div style={styles.bidsContainer}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Highest Bidding</h2>
        <button
          style={styles.seeAllButton}
          onClick={() => {
            fetch();
            setIsOpen(true);
          }}
        >
          See All
        </button>
      </div>
      {bids?.map((bid) => (
        <div key={bid.id} style={styles.bidItem}>
          <img
            src={
              "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg"
            }
            alt={bid.name}
            style={styles.bidImage}
          />
          <div style={styles.bidInfo}>
            <h4 style={styles.bidName}>
              {bid.auctionRegistration.accountRegistration.username.length > 12
                ? bid.auctionRegistration.accountRegistration.username.slice(
                    0,
                    12
                  ) + "..."
                : bid.auctionRegistration.accountRegistration.username}
            </h4>
            <p style={styles.bidTime}>
              {dayjs(bid.bid_time).format("D MMMM h:mmA")}
            </p>
          </div>
          <div style={styles.bidAmount}>
            <p style={styles.bidPrice}>${bid.bid_price}</p>
            <p style={styles.bidStatus}>{bid.status}</p>
          </div>
        </div>
      ))}
      <Modal
        open={isOpen}
        onOk={() => {
          setIsOpen(false);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        title={"All Bidding of this Session"}
      >
        <>
          {isLoading ? (
            <Spin style={styles.bidsContainer} />
          ) : (
            <>
              {isOpen ? (
                <div style={styles.bidsContainer}>
                  {bids?.map((bid) => (
                    <div key={bid.id} style={styles.bidItem}>
                      <img
                        src={
                          "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg"
                        }
                        alt={bid.name}
                        style={styles.bidImage}
                      />
                      <div style={styles.bidInfo}>
                        <h4 style={styles.bidName}>
                          {bid.auctionRegistration.accountRegistration.username
                            .length > 12
                            ? bid.auctionRegistration.accountRegistration.username.slice(
                                0,
                                12
                              ) + "..."
                            : bid.auctionRegistration.accountRegistration
                                .username}
                        </h4>
                        <p style={styles.bidTime}>
                          {dayjs(bid.bid_time).format("D MMMM h:mmA")}
                        </p>
                      </div>
                      <div style={styles.bidAmount}>
                        <p style={styles.bidPrice}>${bid.bid_price}</p>
                        <p style={styles.bidStatus}>{bid.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      </Modal>
    </div>
  );
};

const styles = {
  bidsContainer: {
    marginTop: "50px",
    width: "100%",
    minWidth: "300px",
    backgroundColor: "#AD9470",
    borderRadius: "15px",
    padding: "20px",
    color: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "24px",
  },
  seeAllButton: {
    backgroundColor: "#65A142C4",
    border: "none",
    borderRadius: "10px",
    padding: "5px 10px",
    cursor: "pointer",
    color: "white",
    fontSize: "14px",
  },
  bidItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#333333",
  },
  bidImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  bidInfo: {
    flexGrow: 1,
  },
  bidName: {
    margin: 0,
    fontSize: "16px",
  },
  bidTime: {
    margin: 0,
    fontSize: "12px",
    color: "#ddd",
  },
  bidAmount: {
    textAlign: "right",
  },
  bidPrice: {
    margin: 0,
    fontSize: "16px",
  },
  bidStatus: {
    margin: 0,
    fontSize: "12px",
    color: "#8fff8f",
  },
};

export default BidsList;
