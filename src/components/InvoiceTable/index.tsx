/* eslint-disable */

import { Table, TableProps, Dropdown } from "antd";
import { useState } from "react";
import InvoicesStates from "../States/InvoicesStates";
import { INVOICE_COLUMNS } from "../../constants/billings";

interface InvoiceData {
  key: string;
  _id: string;
  number: string;
  invoiceDate: string;
  customer: string;
  bookingID: string;
  totalAmount: any;
  amountPaid: any;
  outstanding: any;
  status: any;
}
const InvoiceTable = () => {
  const columns: TableProps<InvoiceData>["columns"] = [...INVOICE_COLUMNS];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: InvoiceData[]
  ) => {
    console.log(selectedRowKeys, "selectedRowKeys");
    setSelectedRowKeys(selectedRowKeys);
    console.log("Selected Rows: ", selectedRows);
  };

  const rowData = [
    {
      _id: "123456",
      number: "GR2425-0001",
      invoiceDate: "28/10/2024",
      customer: "Apple",
      bookingID: "1232425",
      totalAmount: 2000,
      amountPaid: 2000,
      outstanding: 1000,
      status: "Generated",
    },
    {
      _id: "123457",
      number: "GR2425-0002",
      invoiceDate: "28/10/2024",
      customer: "Apple",
      bookingID: "1232425",
      totalAmount: 2000,
      amountPaid: 2000,
      outstanding: 1000,
      status: "Paid",
    },
    {
      _id: "123458",
      number: "GR2425-0003",
      invoiceDate: "28/10/2024",
      customer: "Apple",
      bookingID: "1232425",
      totalAmount: 2000,
      amountPaid: 2000,
      outstanding: 1000,
      status: "Cancelled",
    },
    {
      _id: "123459",
      number: "GR2425-0005",
      invoiceDate: "28/10/2024",
      customer: "Apple",
      bookingID: "1232425",
      totalAmount: 2000,
      amountPaid: 2000,
      outstanding: 1000,
      status: "Paid",
    },
    {
      _id: "123460",
      number: "GR2425-0004",
      invoiceDate: "28/10/2024",
      customer: "Apple",
      bookingID: "1232425",
      totalAmount: 2000,
      amountPaid: 2000,
      outstanding: 1000,
      status: "Paid",
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      rowSelection={{
        type: "checkbox",
        onChange: onChange,
        selectedRowKeys: selectedRowKeys,
      }}
      dataSource={rowData?.map((data) => {
        return {
          ...data,
          totalAmount: <div>{`₹${data?.totalAmount}`}</div>,
          amountPaid: <div>{`₹${data?.amountPaid}`}</div>,
          outstanding: <div>{`₹${data?.outstanding}`}</div>,
          status: <InvoicesStates status={data.status} />,
          key: data?._id,
        };
      })}
      pagination={false}

    />
  );
};

export default InvoiceTable;
