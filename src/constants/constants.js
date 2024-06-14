// import { render } from "node-sass";


export const COLUMS_REQUEST_SELL = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',

    // render: (a) => {console.log(a)}
  },
  {
    title: 'jewelryname',
    dataIndex: 'jewelryname',
    key: 'jewelryname',
  },

  {
    title: 'requestdate',
    dataIndex: 'requestdate',
    key: 'requestdate',
  },
  {
    title: 'ultimateValuation',
    dataIndex: 'ultimateValuation',
    key: 'ultimateValuation',
    render: (ultimateValuation)=> ultimateValuation?.price ?  ultimateValuation?.price : "N/A"
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    filterMode: "tree",
    filters: [
      {
        text: "PENDING",
        value: "PENDING",
      },
      {
        text: "REJECTED",
        value: "REJECTED",
      },
      {
        text: "CONFIRMED",
        value: "CONFIRMED",
      },
      {
        text: "Hoan",
        value: "Hoan",
      },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.status.includes(value),
  },
];