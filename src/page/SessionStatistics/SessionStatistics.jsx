import { useEffect, useState } from "react";
import { Button, Input, Col, Row, Statistic } from "antd";
import { ContainerOutlined, DollarOutlined, HourglassOutlined, SearchOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { APIgetAuctionSessionDetail } from "../../api/api";

export default function SessionStatistics() {

  const [searchValue, setSearchValue] = useState('');
  const [arrayDataDetail, setArrayDataDetail]  = useState([{label :"RED",quantity:12},
    {label :"BLUE",quantity:12},
    {label :"YELLOW",quantity:12},
    {label :"GREN",quantity:12}]);

  const handleSearchDetail = async (value) =>{
    console.log(value);
    APIgetAuctionSessionDetail(value).then(rs => {
      console.log(rs.data)
      setArrayDataDetail(rs.data)
    }) .catch ((error) => {
      console.log(error);
    }) .finally(() => {
    });
  }

  const cardStyle = {
    height: "200px",
    width: "100%",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    position: "relative",
  };

  const iconStyle = {
    position: "absolute",
    top: "50px",
    right: "50px",
    fontSize: "60px",
    color: "#fff",
  };

  // Tìm phần tử có label là "Total Registration"
  const totalRegistrationItem = arrayDataDetail.find(item => item.label === "Total Registration");
  // Lấy giá trị quantity của phần tử totalRegistrationItem
  const totalRegistration = totalRegistrationItem ? totalRegistrationItem.quantity : 0;
  // Tìm phần tử có label là "Total Bidding"
  const totalBiddingItem = arrayDataDetail.find(item => item.label === "Total Bidding");
  // Lấy giá trị quantity của phần tử totalBiddingItem
  const totalBidding = totalBiddingItem ? totalBiddingItem.quantity : 0;
  // Tìm phần tử có label là "Total Price"
  const totalPriceItem = arrayDataDetail.find(item => item.label === "Total Price");
  // Lấy giá trị quantity của phần tử totalPriceItem
  const totalPrice = totalPriceItem ? totalPriceItem.quantity : 0;

  return (
    <>
      <Row justify="end" style={{ marginBottom: "20px" }}>
        <Col span={16}>
          <div>
            <h2>JEWELJOUST!</h2>
            <h6 style={{ fontSize: 14 }}>
              Your Ultimate Destination for Exciting Auctions
            </h6>
          </div>
        </Col>
        <Col span={8}>
          <Input.Search
            placeholder="Search by Session ID"
            enterButton={<Button icon={<SearchOutlined />} />}
            size="middle"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearchDetail}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={20}>
        <Col span={12} >
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #B8D9D0, #3C7363)"
            }}
          >
            <TeamOutlined style={iconStyle} />
            <Statistic title="Total Auction Participants:"
            value={totalRegistration} valueStyle={{ fontSize: '60px' }} />
            <p style={{fontSize: "28px"}}>MEMBER</p>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #F2E9E9, #F2A7AD)"
            }}
          >
            <ContainerOutlined style={iconStyle} />
            <Statistic title="Total Auction Bids:" 
            value={totalBidding} valueStyle={{ fontSize: '60px' }} />
            <p style={{fontSize: "28px"}}>BID</p>        
          </div>
        </Col>
      </Row>
      <Row justify="center" gutter={20} marginTop="20px">
        <Col span={12}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #97F2F3, #079DD9)",
              marginTop: "20px",
            }}
          >
            <DollarOutlined style={iconStyle} />
            <Statistic title="Total Auction Amount:" 
            value={totalPrice} valueStyle={{ fontSize: '60px' }} /> 
            <p style={{fontSize: "28px"}}>USD</p>      
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #F3DDB3, #E08963)",
              marginTop: "20px",
            }}
          >
            <HourglassOutlined style={iconStyle} />
            <Statistic title="Total Auction Registrations:" 
            value={totalPrice} valueStyle={{ fontSize: '60px' }} /> 
            <p style={{fontSize: "28px"}}>MEMBER</p>
          </div>
        </Col>
      </Row>
    </>
  );
}
