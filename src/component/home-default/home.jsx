import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
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
import { logout, selectUser } from "../../redux/features/counterSlice";

import { Avatar, Dropdown, Space } from "antd";
import BalanceDisplay from '../BalanceDisplay/BalanceDisplay';
export default function HomePage({ children }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
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
              <div className="user-wallet">
                <div className="App">
                  
                  <BalanceDisplay />
                </div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </a>
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
