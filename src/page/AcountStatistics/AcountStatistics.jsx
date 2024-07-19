import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function AcountStatistics() {
  //   ChartJS.register(
  //     CategoryScale,
  //     LinearScale,
  //     BarElement,
  //     Title,
  //     Tooltip,
  //     Legend
  //   );
  //   const [data, setData] = useState([]);

  //   const fetchData = async () => {};

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
