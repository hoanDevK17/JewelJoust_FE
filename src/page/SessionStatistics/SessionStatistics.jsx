import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";

export default function SessionStatistics() {
  const [data, setData] = useState([]);

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
}
