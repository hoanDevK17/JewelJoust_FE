import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Button, Statistic, Input, Col, Row, Select, Modal } from 'antd';
import { UserOutlined, SettingOutlined, SmileOutlined, SyncOutlined, SearchOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { APIgetAllStatistics, APIgetStatisticsAcount, APIgetStatisticsRequest, APIgetStatisticsRevenue, APIgetStatisticsSession, APIgetStatisticsSessionDetail } from "../../api/api";
const currentYear = new Date().getFullYear();

export default function SessionStatistics() {
  const [statisticAll, setStatisticAll] = useState();
  const [labelChart, setLabelChart] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [statisticData, setStatisticData] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [searchValue, setSearchValue] = useState('');
  const [arrayDataDetail, setArrayDataDetail]  = useState([{lable :"RED",quantity:12},
    {lable :"BLUE",quantity:12},
    {lable :"YELLOW",quantity:12},
    {lable :"BLACK",quantity:12},
    {lable :"QUANG",quantity:100},
    {lable :"PHAT",quantity:12},
    {lable :"HOAN",quantity:12},
    {lable :"BI",quantity:12},
    {lable :"TRUONG",quantity:12},
    {lable :"SANG",quantity:12},
    {lable :"PINK",quantity:12},
    {lable :"GREN",quantity:12}]);

  const arrayData = [
    { lable: "Session", handle: (year) => { return APIgetStatisticsSession(year) }, handlePie: () => { return APIgetStatisticsSessionDetail() } },
    { lable: "Revenue", handle: (year) => { return APIgetStatisticsRevenue(year) } }, 
    { lable: "Request", handle: (year) => { return APIgetStatisticsRequest(year) }, handlePie: () => { return APIgetStatisticsSessionDetail() } },   
    { lable: "Acount", handle: (year) => { return APIgetStatisticsAcount(year) }, handlePie: () => { return APIgetStatisticsSessionDetail() } }  
  ];
  const years = Array.from({ length: 5 }, (v, i) => ({
    value: currentYear - i,
    label: `${currentYear - i}`,
  }));

  const fetchData = async () => {
    // setIsLoading(true);
    APIgetAllStatistics().then(rs => {
      console.log(rs.data)
      setStatisticAll(rs.data)
    })
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
            return labelChart + `: ${tooltipItem.raw}`;
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

  
    const dataPie = {
    labels: arrayDataDetail.map((item => item.lable)),
    datasets: [
      {
        label: "số lượng",
        data:arrayDataDetail.map((item => item.quantity)),
        backgroundColor: [
          '#FFD700', '#32CD32', '#FF4500', '#FF6347', '#4682B4',
          '#8A2BE2', '#DAA520', '#DC143C', '#FF1493', '#3CB371',
          '#00FA9A', '#B22222', '#8B0000', '#FF7F50', '#6495ED',
          '#D2691E', '#00CED1', '#2E8B57'
        ],
        hoverBackgroundColor: [
          '#FFD700', '#32CD32', '#FF4500', '#FF6347', '#4682B4',
          '#8A2BE2', '#DAA520', '#DC143C', '#FF1493', '#3CB371',
          '#00FA9A', '#B22222', '#8B0000', '#FF7F50', '#6495ED',
          '#D2691E', '#00CED1', '#2E8B57'
        ],
        borderColor: [
          '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
          '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
          '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
          '#FFFFFF', '#FFFFFF', '#FFFFFF'
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: true, // Cho phép kích thước tùy chỉnh,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const handleOnclickViewChart = async (lable) => {
    setLabelChart(lable)
    try {
      const itemLable = arrayData.find(item => item.lable == lable)
      itemLable.handle(year).then((rs) => {
        console.log(rs.data)
        setStatisticData(rs.data)
      })
    } catch (error) {
      console.log(error)
    }

  }
  const handleOnclickViewPie = async (lable) => {
    setLabelChart(lable)
    try {
      const itemLable = arrayData.find(item => item.lable == lable)
      itemLable.handlePie(year).then((rs) => {
        console.log(rs.data)
        setArrayDataDetail(rs.data)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsOpen(true)}
    }

  
  useEffect(() => {
    fetchData();

  }, []);
  useEffect(() => {
    // fetchData();
    if (labelChart != null) {
      handleOnclickViewChart(labelChart, year)
    }
  }, [year]);

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
            <UserOutlined style={iconStyle}/>
            <Statistic title="Total Revenue" value={statisticAll?.totalBid} valueStyle={{ fontSize: '32px' }} />
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={() => {
                // console.log("dmm")
                handleOnclickViewChart("Revenue")
              }}
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
            <SettingOutlined style={iconStyle} onClick={()=>{handleOnclickViewPie("Sessions")}}/>
            <Statistic title="Total Sessions" value={statisticAll?.totalSession} valueStyle={{ fontSize: '32px' }} />
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={() => {
                // console.log("dmm")
                handleOnclickViewChart("Session")
              }}
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
            <SmileOutlined style={iconStyle} onClick={()=>{handleOnclickViewPie("Sessions")}} />
            <Statistic title="Total Request" value={statisticAll?.totalRequest} valueStyle={{ fontSize: '32px' }} />
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={() => {
                // console.log("dmm")
                handleOnclickViewChart("Request")
              }}  
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
            <SyncOutlined style={iconStyle} onClick={()=>{handleOnclickViewPie("Sessions")}}/>
            <Statistic title="Total Member" value={statisticAll?.totalAccount} valueStyle={{ fontSize: '32px' }} />
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={() => {
                // console.log("dmm")
                handleOnclickViewChart("Acount")
              }}
            >
              View Chart
            </Button>
          </div>
        </Col>
      </Row>
      {labelChart &&
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>{`Bar Chart with Trend Line of ${labelChart}`}</h2>
            <Select
              showSearch
              style={{
                width: 200,
              }}
              defaultValue={year}
              placeholder="Select a Year"
              optionFilterProp="label"
              onChange={(value) => setYear(value)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={years}
            />
          </div>
          <div
          style={{
            maxWidth: "1024px",
            margin: "auto" 
          }}
          >
            <Bar data={data} options={options} />
          </div>
        </div>
      }
    <Modal 
     open={isOpen}
     onOk={() =>setIsOpen(false)}
     onCancel={() => setIsOpen(false)}
    >
      
      <Pie data={dataPie} options={optionsPie}  />
    </Modal>
    </>
  );
}
