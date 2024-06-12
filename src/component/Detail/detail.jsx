import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../share-data/productData";
import HomePage from "../home-default/home";
import Footer from "../../component/footer/footer.jsx";
import "./detail.scss";
import MyCarousel from "../carousel/Carousel.jsx";
export default function Detail() {
  const navigate = useNavigate();
  const userName = useParams();
  const product = Products.find((obj) => {
    return obj.id == userName.id;
  });
  let price = product.price.toLocaleString();
  let profileCost = product.profileCost.toLocaleString();
  let jump = product.jump.toLocaleString();
  let depositFee = product.depositFee.toLocaleString();

  return (
    <div>
      <HomePage>
        <div className="container">
          <h4
            style={{
              textAlign: "center",
            }}
          >
            {product.name}
          </h4>
          <div className="product-card">
            <div>
              <img
                style={{
                  width: "600px",
                  height: "500px",
                  marginRight: "20px",
                  borderRadius: "10px",
                }}
                src={`${product.image}`}
                alt=""
              />
            </div>
            <div className="product-details">
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Product Code:
              </p>
              {product.id}
              <div className="product-price">
                <p
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  Initial Price:
                </p>
                {price}$
              </div>
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Selling Time:
              </p>
              {product.sellTime}
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Deposit Time:
              </p>
              {product.afterTime}
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Profile Cost:
              </p>
              {product.profileCost}$
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Leap:
              </p>
              {product.jump}$
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                Deposit Fee:
              </p>
              {product.depositFee}$
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                {" "}
                Auction Form:
              </p>
              {product.hinhThuc}
              <div className="button-outside">
                <Link to={`/RegisterAuction`}>
                  <p>
                    <button className="button-detail">Auction Register</button>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="product-story">
          <h1>Product Story</h1>
        </div>
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <MyCarousel />
        </div>
      </HomePage>
      <Footer />
    </div>
  );
}
