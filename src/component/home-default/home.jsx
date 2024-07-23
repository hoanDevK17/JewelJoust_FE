import {
  DashboardOutlined,
  HistoryOutlined,
  LoadingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  RedoOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  refreshBalance,
  selectUser,
} from "../../redux/features/counterSlice";
import { motion } from "framer-motion";

import { Avatar, Dropdown, Space } from "antd";
import { useState } from "react";
import { APIrefreshBalance } from "../../api/api";
import useRealtime from "../../assets/hook/useRealTime";
import Footer from "../footer/footer";

export default function HomePage({ children }) {
  useRealtime(async (body) => {
    if (body.body == "addBid") {
      await handleRefreshBalance();
    }
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const user = useSelector(selectUser);
  const isMember = user?.role === "MEMBER";
  const dispatch = useDispatch();
  const [isRefreshBalance, setIsRefreshBalance] = useState(false);

  const itemsMember = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },

    {
      key: "2",
      icon: <HistoryOutlined />,
      label: "Active History",
      onClick: () => {
        navigate("/ActiveHistory/RequestSell");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },

    {
      key: "3",
      icon: <WalletOutlined />,
      label: "Wallet",
      onClick: () => {
        navigate("/Wallet/History/1");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Log Out",
      onClick: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];
  const itemsAdmin = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/dashboard/acount");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: "Log Out",
      onClick: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];

  const handleRefreshBalance = () => {
    setIsRefreshBalance(true);
    APIrefreshBalance()
      .then((rs) => {
        if (rs.status === 200) {
          // user.wallet.balance = JSON.stringify(rs.data);
          dispatch(refreshBalance(rs.data));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsRefreshBalance(false);
      });
  };

  const balance = Number(user?.wallet?.balance);

  const formattedBalance = (Math.floor(balance * 100) / 100)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
    >
      <div className="home-default">
        <div className="home-page-header">
          <div className="home-page-logo">
            <span className="button-link" onClick={handleClick}>
              <img
                src="/Logo.svg"
                alt=""
                style={{ maxHeight: "45px", maxWidth: "200px" }}
              />
            </span>
          </div>
          <div className="home-page-title">
            <span className="button-link" onClick={handleClick}>
              Home
            </span>
            <span
              className="button-link"
              onClick={() => {
                navigate("/bidding");
              }}
            >
              Bidding
            </span>
            <span
              className="button-link"
              onClick={() => {
                navigate("/sessions");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              AuctionSession
            </span>
            <span
              className="button-link"
              onClick={() => {
                navigate("/auctionRequestSell");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              AuctionRequestSell
            </span>
            <span
              className="button-link"
              onClick={() => {
                navigate("/ConditionsAndServices");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              About Us
            </span>
            <span
              className="button-link"
              onClick={() => {
                navigate("/Blog");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Blog
            </span>
          </div>

          <div className="home-page-login">
            {user ? (
              <>
                {" "}
                <div className="user_wallet_all">
                  <span style={{ display: "flex", justifyContent: "flex-end" }}>
                    Hi👋{"  "} {user?.fullname}
                  </span>
                  {isMember ? (
                    <div
                      className="user-wallet"
                      style={{ alignItems: "center" }}
                    >
                      {isRefreshBalance ? (
                        <LoadingOutlined />
                      ) : (
                        <RedoOutlined onClick={handleRefreshBalance} />
                      )}
                      <span
                        onClick={(e) => e.preventDefault()}
                        style={{ fontSize: "16px" }}
                      >
                        Balance: {formattedBalance}$
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <Dropdown
                  menu={{ items: isMember ? itemsMember : itemsAdmin }}
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
        <div style={{ margin: "auto", maxWidth: "1200px", minWidth: "1024px" }}>
          <div className="home-page-body">{children}</div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}
