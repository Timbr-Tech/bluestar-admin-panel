/* eslint-disable */

export const INVOICE_COLUMNS = [
  {
    title: "Number",
    dataIndex: "number",
    className: "custom-header",
  },
  {
    title: "Invoice date",
    dataIndex: "invoiceDate",
    classNames: "custom-row",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    classNames: "custom-row",
  },
  {
    title: "Booking ID",
    dataIndex: "bookingID",
    classNames: "custom-row",
  },
  {
    title: "Total amount",
    dataIndex: "totalAmount",
    classNames: "custom-row",
  },
  {
    title: "Amount paid",
    dataIndex: "amountPaid",
    classNames: "custom-row",
  },
  {
    title: "Outstanding",
    dataIndex: "outstanding",
    classNames: "custom-row",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

export const RECEIPTS_COLUMNS = [
  {
    title: "Receipt Number",
    dataIndex: "receiptNumber",
    className: "custom-header",
  },
  {
    title: "Entry date",
    dataIndex: "entryDate",
    classNames: "custom-row",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    classNames: "custom-row",
  },
  {
    title: "Invoices",
    dataIndex: "invoices",
    classNames: "custom-row",
  },
  {
    title: "Mode",
    dataIndex: "mode",
    classNames: "custom-row",
  },
  {
    title: "Credit date",
    dataIndex: "creditDate",
    classNames: "custom-row",
  },
  {
    title: "Amount paid",
    dataIndex: "amountPaid",
    classNames: "custom-row",
  },
  {
    title: "Status",
    dataIndex: "status",
    classNames: "custom-row",
  },
];

export const INVOICES_STATES = {
  GENERATED: "Generated",
  ACTIVE: "Active",
  PAID: "Paid",
  CANCELLED: "Cancelled",
};

export const RECEIPTS_STATES = {
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};
