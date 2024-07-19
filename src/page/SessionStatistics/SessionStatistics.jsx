import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Button, Statistic, Input, Col, Row } from 'antd';
import { UserOutlined, SettingOutlined, SmileOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';

export default function SessionStatistics() {

  const [statisticAll, setStatisticAll] = useState();
  const [labelChart, setLabelChart] = useState();
  const [statisticData, setStatisticData] = useState();

  const handleAcountChart=async ()=> {
    setStatisticData([7, 3, 11, 1, 9, 6, 2, 8, 12, 4, 10, 5])
    setLabelChart("Number Acount")
  }

  const handleSessionChart=async ()=> {
    setStatisticData([4, 12, 6, 1, 8, 11, 3, 10, 5, 2, 9, 7])
    setLabelChart("Number Session")
  }

  const handleRequestChart=async ()=> {
    setStatisticData([10, 5, 8, 3, 7, 12, 2, 11, 1, 4, 9, 6])
    setLabelChart("Number Request")
  }

  const handleRevenueChart=async ()=> {
    setStatisticData([2, 9, 7, 11, 4, 10, 6, 1, 12, 8, 5, 3])
    setLabelChart("Number Revenue")
  } 

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
    datasets: [
      {
        label: labelChart,
        data: statisticData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0.1,
        barThickness: 40, // Điều chỉnh chiều ngang của các cột
      },
      {
        label: labelChart,
        data: statisticData, // Dữ liệu giống như dữ liệu của cột
        type: 'line',
        borderColor: 'rgba(255, 99, 132, 1)', // Màu sắc của đường gấp khúc
        borderWidth: 2,
        fill: false,
        tension: 0.1, // Điều chỉnh độ cong của đường
      },
    ],
   
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return labelChart+`: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        barThickness: 20, // Chiều ngang của các cột trên trục x
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const [searchValue, setSearchValue] = useState('');

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    // Implement your search logic here
    console.log("Search value:", value);
  };

  const cardStyle = {
    height: "100%",
    width: "100%",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    position: "relative",
  };

  const iconStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "24px",
    color: "#fff",
  };

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
            onSearch={handleSearch}    
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={20}>
        <Col span={6}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #B8D9D0, #3C7363)"
            }}
          >
            <UserOutlined style={iconStyle} />
            <Statistic title="Total Revenue" value={statisticAll?.Revenue} valueStyle={{ fontSize: '32px' }}/>
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={handleRevenueChart}
            >
              View Chart
            </Button>
          </div>
        </Col>
        <Col span={6}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #F2E9E9, #F2A7AD)"
            }}
          >
            <SettingOutlined style={iconStyle} />
            <Statistic title="Total Sessions" value={statisticAll?.Sessions} valueStyle={{ fontSize: '32px' }}/>
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={handleSessionChart}
            >
              View Chart
            </Button>
          </div>
        </Col>
        <Col span={6}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #97F2F3, #079DD9)"
            }}
          >
            <SmileOutlined style={iconStyle} />
            <Statistic title="Total Request" value={statisticAll?.Request} valueStyle={{ fontSize: '32px' }}/>
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={handleRequestChart}
            >
              View Chart
            </Button>
          </div>
        </Col>
        <Col span={6}>
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(to right, #F3DDB3, #E08963)"
            }}
          >
            <SyncOutlined style={iconStyle} />  
            <Statistic title="Total Acount" value={statisticAll?.Acount} valueStyle={{ fontSize: '32px' }}/>
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={handleAcountChart}
            >
              View Chart
            </Button>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: "20px" }}>
        <h2>{labelChart + ` Bar Chart with Trend Line`}</h2>
        <Bar data={data} options={options}/>
      </div>
    </>
  );
}
