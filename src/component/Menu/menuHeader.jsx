import React, { useState } from "react";
import { Avatar, Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";
export default function MenuHeader() {
 const dispatch= useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const navigate =useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

 
  return (
  
  );
}