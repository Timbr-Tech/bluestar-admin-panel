/* eslint-disable */

import { Table, TableProps, Dropdown, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import ReceiptStates from "../States/ReceiptStates";
import { RECEIPTS_COLUMNS } from "../../constants/billings";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../types/store";
import { formatDateFull } from "../../utils/date";
import CustomPagination from "../Common/Pagination";
import { getReceipts } from "../../redux/slices/billingSlice";

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
  const { filters, receipts, pagination } = useAppSelector(
    (state: RootState) => state.billing
  );

  const dispatch = useAppDispatch();
  const columns: TableColumnsType<any> = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Invoice Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },
    {
      title: "Amount Outstanding",
      dataIndex: "amountOutstanding",
      key: "amountOutstanding",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const populateDate = () => {
    return receipts?.map((data) => {
      return {
        ...data,
        invoiceNumber: data?.invoiceNumber,
        customerName: data?.customerDetails?.name,
        amountPaid: `₹${data?.amountPaid}`,
        amount: `₹${data?.amount}`,
        date: `${formatDateFull(data?.date)}`,
        amountOutstanding: `₹${data?.amountOutstanding}`,
        status: <ReceiptStates status={data.status} />,
        key: data?._id,
        id: data?._id,
      };
    });
  };

  console.log("receipts", receipts);
  useEffect(() => {
    dispatch(getReceipts({ ...filters }));
  }, [filters.search, filters.status]);

  return (
    <Table
      bordered
      columns={columns}
      rowSelection={{
        type: "checkbox",
        // onChange: onChange,
        selectedRowKeys: selectedRowKeys,
      }}
      dataSource={populateDate()}
      pagination={false}
      footer={() => (
        <CustomPagination
          total={pagination?.total ?? 0}
          current={pagination?.page ?? 1}
          pageSize={pagination.limit ?? 10}
          onPageChange={(page: number) => {
            dispatch(
              getReceipts({
                search: filters.search,
                page: page,
              })
            );
          }}
        />
      )}
    />
  );
};

export default ReceiptTable;
