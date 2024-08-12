/* eslint-disable */
import { VEHICLE_GROUPS } from "../../../constants/database";
import { Table } from "antd";
import type { TableProps } from "antd";
import React from "react";

interface IVehicleGroupTableData {
  key: React.Key;
  name: string;
  total_vehicles: number;
}

const columns: TableProps<IVehicleGroupTableData>["columns"] = [
  ...VEHICLE_GROUPS,
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data: IVehicleGroupTableData[] = [
  {
    key: "1",
    name: "Toyota Innova",
    total_vehicles: 3,
  },
  {
    key: "2",
    name: "Nissan Hatchbacks",
    total_vehicles: 4,
  },
  {
    key: "3",
    name: "MG Hector/MG Titan ",
    total_vehicles: 9,
  },
  {
    key: "4",
    name: "Toyota Sedans",
    total_vehicles: 3,
  },
  {
    key: "5",
    name: "Toyota Innova",
    total_vehicles: 4,
  },
  {
    key: "6",
    name: "Toyota Innova",
    total_vehicles: 9,
  },
];

const VehicleGroupTable = () => {
  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IVehicleGroupTableData[]
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
      columns={columns}
      dataSource={data}
    />
  );
};

export default VehicleGroupTable
