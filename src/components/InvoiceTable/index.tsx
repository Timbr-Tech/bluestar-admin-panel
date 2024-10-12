/* eslint-disable */

import { Table, TableProps, Dropdown } from "antd";
import { INVOICE_COLUMNS } from "../../constants/billings";

interface InvoiceData {
  key: string;
  _id: string;
  number: number;
  invoiceDate: string;
  customer: string;
  bookingID: string;
  totalAmount: number;
  amountPaid: number;
  outstanding: number;
  status: any;
}
const InvoiceTable = () => {
  const columns: TableProps<InvoiceData>["columns"] = [...INVOICE_COLUMNS];
  return <Table columns={columns} />;
};

export default InvoiceTable;
