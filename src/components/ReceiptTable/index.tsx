/* eslint-disable */

import { Table, TableProps, Dropdown } from "antd";
import { useState } from "react";
import ReceiptStates from "../States/ReceiptStates";
import { RECEIPTS_COLUMNS } from "../../constants/billings";

interface ReceiptData {
  key: string;
  _id: string;
  receiptNumber: string;
  entryDate: string;
  customer: string;
  invoices: string;
  mode: string;
  creditDate: string;
  amountPaid: any;
  status: any;
}
const ReceiptTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: TableProps<ReceiptData>["columns"] = [...RECEIPTS_COLUMNS];

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ReceiptData[]
  ) => {
    console.log(selectedRowKeys, "selectedRowKeys");
    setSelectedRowKeys(selectedRowKeys);
    console.log("Selected Rows: ", selectedRows);
  };

  const rowData = [
    {
      _id: "123456",
      receiptNumber: "R-GR2425-0001",
      entryDate: "28/10/2024",
      customer: "Apple",
      invoices: "GR2425-1",
      mode: "Cash",
      creditDate: "28/10/2024",
      amountPaid: 2000,
      status: "Confirmed",
    },
    {
      _id: "123457",
      receiptNumber: "R-GR2425-0001",
      entryDate: "28/10/2024",
      customer: "Apple",
      invoices: "GR2425-1",
      mode: "Credit Card",
      creditDate: "28/10/2024",
      amountPaid: 2000,
      status: "Confirmed",
    },
    {
      _id: "123458",
      receiptNumber: "R-GR2425-0001",
      entryDate: "28/10/2024",
      customer: "Apple",
      invoices: "GR2425-1",
      mode: "PayPal",
      creditDate: "28/10/2024",
      amountPaid: 2000,
      status: "Confirmed",
    },
    {
      _id: "123459",
      receiptNumber: "R-GR2425-0001",
      entryDate: "28/10/2024",
      customer: "Apple",
      invoices: "GR2425-1",
      mode: "UPI",
      creditDate: "28/10/2024",
      amountPaid: 2000,
      status: "Cancelled",
    },
  ];

  return (
    <Table
      columns={columns}
      bordered
      dataSource={rowData?.map((data) => {
        return {
          ...data,
          amountPaid: <div>{`₹${data?.amountPaid}`}</div>,
          status: <ReceiptStates status={data?.status} />,
          key: data?._id,
        };
      })}
      rowSelection={{
        type: "checkbox",
        onChange: onChange,
        selectedRowKeys: selectedRowKeys,
      }}
      pagination={false}
    />
  );
};

export default ReceiptTable;
