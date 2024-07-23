import { useEffect, useState } from "react";
import {
  APIgetTransactionsWithDrawal,
  APIgetTransactionsWithDrawalConfirm,
} from "../../api/api";
import { Button, Spin, Table, Upload, message } from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";

export default function WalletHistory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({}); // State to track uploaded images

  // Handle file upload
  const handleUpload = (info, record) => {
    if (info.file.status === "done") {
      // When the file is successfully uploaded
      message.success(`${info.file.name} file uploaded successfully.`);
      setUploadedImages((prev) => ({
        ...prev,
        [record.id]: info.file.response.url, // Assuming the server response contains the URL of the uploaded image
      }));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleConfirm = (record) => {
    console.log(record.id);
    APIgetTransactionsWithDrawalConfirm(record.id)
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        const formattedAmount = Number(text)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return formattedAmount;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "N/A"), // Display "N/A" if no status
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Upload Image",
      key: "upload",
      render: (text, record) => (
        <Upload
          name="file"
          action="/upload" // Change to your actual upload endpoint
          onChange={(info) => handleUpload(info, record)}
          showUploadList={false} // Hide default file list UI
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      ),
    },
    {
      title: "Confirm",
      render: (value, record) => (
        <Button
          type="primary"
          style={{
            background:
              record.status === "PENDING" && uploadedImages[record.id]
                ? "green"
                : "gray",
          }}
          onClick={() => handleConfirm(record)}
          disabled={
            record.status !== "PENDING" || !uploadedImages[record.id] // Disable if not pending or no image
          }
        >
          <CheckOutlined />
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    APIgetTransactionsWithDrawal()
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            height: "100vh",
            width: "100%",
            paddingTop: "40vh",
          }}
        ></Spin>
      ) : (
        <div style={{ width: "100%" }}>
          <Table dataSource={data} columns={columns} />
        </div>
      )}
    </>
  );
}
