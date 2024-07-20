import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";

export default function AcountStatistics() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 40, // Điều chỉnh chiều ngang của các cột
      },
      {
        label: "Trend Line",
        data: [65, 59, 80, 81, 56, 55, 40], // Dữ liệu giống như dữ liệu của cột
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
            return `Sales: ${tooltipItem.raw}`;
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

  return (
    <div>
      <h2>Bar Chart with Trend Line</h2>
      <Bar data={data} options={options}/>
    </div>
  );
}
