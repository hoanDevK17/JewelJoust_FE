import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  RedoOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/counterSlice";

import { Avatar, Dropdown, Space } from "antd";
import { useState } from "react";
import { APIrefreshBalance } from "../../api/api";

export default function HomePage({ children }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isRefreshBalance, setIsRefreshBalance] = useState(false);
  const items = [
    {
      key: "1",
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },

    {
      key: "2",
      label: "Active History",
      onClick: () => {
        navigate("/ActiveHistory");
      },
    },

    // {
    //   key: "3",
    //   label: "Wallet",
    //   onClick: () => {
    //     navigate("/Wallet");
    //   },
    // },
    {
      key: "3",
      label: "Log Out",
      onClick: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];
  const handleRefreshBalance = () => {
    setIsRefreshBalance(true);
    APIrefreshBalance(user.token)
      .then((rs) => {
        if (rs.status === 200) {
          user.wallet.balance = JSON.stringify(rs.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsRefreshBalance(false);
      });
  };
  return (
    <div className="home-default">
      <div className="home-page-header">
        <div className="home-page-logo">
          <span
            className="button-link"
            onClick={() => {
              navigate("/homepage");
            }}
          >
            <img src="/Logo.svg" alt="" />
          </span>
        </div>
        <div className="home-page-title">
          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/sessions");
            }}
          >
            Jewelry Auction
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/auctionRequestSell");
            }}
          >
            AuctionRequestSell
          </span>
          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            News
          </span>

          <span
            className="button-link"
            onClick={() => {
              navigate("/");
            }}
          >
            About Us
          </span>
        </div>
        <div className="home-page-login">
          {user ? (
            <>
              <div className="user-wallet" style={{ alignItems: "center" }}>
                {isRefreshBalance ? (
                  <LoadingOutlined />
                ) : (
                  <RedoOutlined onClick={handleRefreshBalance} />
                )}
                <span
                  onClick={(e) => e.preventDefault()}
                  style={{ fontSize: "16px" }}
                >
                  Balance: {user?.wallet?.balance}$
                </span>

                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Space>
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined />}
                    />
                  </Space>
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              <span
                className="button-link"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </span>
              <span
                className="button-link"
                onClick={() => {
                  navigate("/registration");
                }}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
      <div className="home-page-body">{children}</div>
    </div>
  );
}
