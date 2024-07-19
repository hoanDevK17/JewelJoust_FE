import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";
import { Line } from "react-chartjs-2";

export default function Revenues() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
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
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
}
