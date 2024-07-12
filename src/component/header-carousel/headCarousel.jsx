import { Button, Carousel } from "antd";
import React from "react";
import "./headeCarousel.scss";
import { useNavigate } from "react-router-dom";
export default function HeadCarousel() {
  const navigate = useNavigate();
  return (
    <div className=" banner">
      <Carousel autoplay className="carousel" style={{}}>
        <div>
          <img
            src="https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg"
            alt=""
          />
          <div style={{ position: "absolute", zIndex: "10000", top: "85px" }}>
            <h2 className="annouce">Auction Registeration</h2>
            <div className="inside-item">
              <button
                className="button-num1"
                onClick={() => {
                  navigate("/registration");
                }}
              >
                <p>Register</p>
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://dam.bluenile.com/images/public/21095/Blue%20Nile%20Diamond%20Jewelry.jpeg"
            alt=""
          />
          <div style={{ position: "absolute", zIndex: "10000", top: "85px" }}>
            <h2 className="annouce2">View All Jewelries</h2>
            <div className="inside-item2">
              <button
                className="button-num2"
                onClick={() => {
                  navigate("/sessions");
                }}
              >
                <p>View</p>
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
