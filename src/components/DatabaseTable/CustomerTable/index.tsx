/* eslint-disable */
import { CUSTOMERS } from "../../../constants/database";
import { Table } from "antd";
import React from "react";

interface ICustomerTableData {
  key: React.Key;
  name: string;
  group_name: string;
  phone: string;
  gstin_number: string;
  status: string;
}

const data: ICustomerTableData[] = [
  {
    key: "1",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "2",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "3",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "4",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "5",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "6",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
  {
    key: "7",
    name: "Apple",
    group_name: "Priority group",
    phone: "(907) 248-8330",
    gstin_number: "22ABBAA0000A1Z8",
    status: "",
  },
];

const CustomerTable = () => {
  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ICustomerTableData[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  return (
    <Table
      rowSelection={{
        type: "checkbox",
        onChange: onChange,
      }}
      columns={CUSTOMERS}
      dataSource={data}
    />
  );
};

export default CustomerTable;
