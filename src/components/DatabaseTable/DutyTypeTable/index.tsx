/* eslint-disable */
import { DUTY_TYPES } from "../../../constants/database";
import { Table } from "antd";
import React from "react";
import CustomPagination from "../../Common/Pagination";
import { useAppSelector } from "../../../hooks/store";

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
  const { q, pagination } = useAppSelector((state) => state.database);
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
      pagination={false}
      scroll={{
        x: 756,
      }}
      footer={() => (
        <CustomPagination
          total={pagination?.total ?? 0}
          current={pagination?.page ?? 1}
          pageSize={pagination.limit ?? 10}
          onPageChange={(page: number) => {
            // dispatch(
            //   getDrivers({
            //     search: q,
            //     page: page,
            //   })
            // );
          }}
        />
      )}
    />
  );
};

export default DutyTypeTable;
