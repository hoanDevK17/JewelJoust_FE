import React from 'react'
import HomePage from '../home-default/home'
import Footer from "../../component/footer/footer.jsx";
import { Switch, Table } from 'antd';
import { useState } from 'react';
export default function AuctionSession() {
  const columns = [
    {
      title: 'Full Name',

      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',

      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',

    },
    {
      title: 'Action',
      key: 'operation',

      render: () => <a href='/homepage'>action</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  return (
    <>
      <HomePage>
        <div className='header-title' style={{
          textAlign:"center",
          marginBottom:"20px"
        }}>
          <h1 style={{
            fontSize:"40px",
            fontFamily:"Georgia ",
            color:"gray",
            fontStyle:"italic"
          }}>Jewelry Auction Sessions</h1>
        </div>
        <Table
          columns={columns}
          dataSource={data}
        />
      </HomePage>
      <Footer />
    </>
  )
}
