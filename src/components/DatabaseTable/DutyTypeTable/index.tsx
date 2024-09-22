/* eslint-disable */
import { DUTY_TYPES } from "../../../constants/database";
import { Table } from "antd";
import React from "react";

interface IDutyTypeTableData {
  key: React.Key;
  name: string;
  type: string;
  max_kilometers: number;
  max_hours: number;
}

interface IDutyTypeTable {
  handleOpenSidePanel: () => void;
}

const data: IDutyTypeTableData[] = [
  {
    key: "1",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "2",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "3",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "4",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "5",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "6",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
  {
    key: "7",
    name: "250KM per day",
    type: "Day-KM (Outstation)",
    max_kilometers: 250,
    max_hours: 4,
  },
];
const DutyTypeTable = ({ handleOpenSidePanel }: IDutyTypeTable) => {
  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IDutyTypeTableData[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  return (
    <Table
      bordered
      rowSelection={{
        type: "checkbox",
        onChange: onChange,
      }}
      columns={DUTY_TYPES}
      dataSource={data}
    />
  );
};

export default DutyTypeTable;
