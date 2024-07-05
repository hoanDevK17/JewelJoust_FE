import { Table } from "antd";

export default function WithdrawalHistory() {
  const dataSource = [
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      age: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      age: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      Amount: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "1",
      ID: "Mike",
      age: 32,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
    {
      key: "2",
      ID: "John",
      Amount: 42,
      Method: "10 Downing Street",
      RequestDate: "20/10/2003",
      Status: "OK",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },

    {
      title: "Request Date",
      dataIndex: "RequestDate",
      key: "RequestDate",
    },
    {
      title: "Method",
      dataIndex: "Method",
      key: "Method",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
  ];
  return (
    <div
      
    >
      {" "}
      <Table style={{
        minHeight: "100%",
      }} dataSource={dataSource} columns={columns} />
    </div>
  );
}
