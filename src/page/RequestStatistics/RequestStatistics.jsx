import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default function RequestStatistics() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "số lượng",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Cho phép kích thước tùy chỉnh,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2
        style={{
          position: "relative",
          width: "80%",
          height: "400px",
          margin: " 0 auto",
        }}
      >
        Pie Chart
      </h2>
      <Pie data={data} options={options}  />
    </div>
  );
}
