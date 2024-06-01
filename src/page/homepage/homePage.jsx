import React, { useState } from "react";
import { Button, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HomePage from "../../component/home-default/home.jsx";
import Footer from "../../component/footer/footer.jsx";
import { useSelector } from "react-redux";

export default function Home() {
  // const user = useSelector({user})
  // console.log(user);
  // const user = useSelector(selectUser); 
  // console.log(user)


  return (
    <>
      <HomePage>
      
      </HomePage>
      <Footer />
    </>
  );
}
