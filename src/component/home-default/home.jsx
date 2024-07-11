import {
  LoadingOutlined,
  PlusOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  refreshBalance,
  selectUser,
} from "../../redux/features/counterSlice";

import { Avatar, Dropdown, Space } from "antd";
import { useState } from "react";
import { APIrefreshBalance } from "../../api/api";

export default function HomePage({ children }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      to: 0,
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
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },

    {
      key: "2",
      label: "Request Sell History",
      onClick: () => {
        navigate("/ActiveHistory/RequestSell");
      },
    },

    {
      key: "3",
      label: "Wallet",
      onClick: () => {
        navigate("/Wallet/History");
      },
    },
    {
      key: "4",
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
      label: "Dashborad",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "2",
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
  
    // Function to format number with spaces
    const formatNumber = (num) => {
      return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
  return (
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
            Jewelry Auction
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
        </div>

        <div className="home-page-login">
          {user ? (
            <>
              {" "}
              <div className="user_wallet_all">
                <span style={{ display: "flex", justifyContent: "flex-end" }}>
                  Welcome: {user?.fullname}
                </span>
                {isMember ? (
                  <div className="user-wallet" style={{ alignItems: "center" }}>
                    {
                      <PlusOutlined
                        onClick={() => {
                          navigate("/Wallet/History");
                        }}
                      />
                    }
                    {isRefreshBalance ? (
                      <LoadingOutlined />
                    ) : (
                      <RedoOutlined onClick={handleRefreshBalance} />
                    )}
                    <span
                      onClick={(e) => e.preventDefault()}
                      style={{ fontSize: "16px" }}
                    >
                      Balance: {formatNumber(Number(user?.wallet?.balance))}$
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
      <div className="home-page-body">{children}</div>
    </div>
  );
}
