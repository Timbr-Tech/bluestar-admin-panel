/* eslint-disable */

import { Table, TableProps, Dropdown } from "antd";
import { RECEIPTS_COLUMNS } from "../../constants/billings";

interface ReceiptData {
  key: string;
  _id: string;
  receiptNumber: number;
  entryDate: string;
  customer: string;
  invoices: string;
  mode: string;
  creditDate: string;
  amountPaid: number;
  status: any;
}
const ReceiptTable = () => {
  const columns: TableProps<ReceiptData>["columns"] = [...RECEIPTS_COLUMNS];
  return <Table columns={columns} />;
};

export default ReceiptTable;
