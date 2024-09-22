/* eslint-disable */
import { FASTTAG_TABLE } from "../../../constants/database";
import { Table } from "antd";
import React from "react";
import CustomPagination from "../../Common/Pagination";
import { useAppSelector } from "../../../hooks/store";

interface IFastTagTableData {
  key: React.Key;
  tag_account: string;
  license_plate: string;
  total_trips: number;
  total_cost: number;
}

const data: IFastTagTableData[] = [
  {
    key: "1",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
  {
    key: "2",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
  {
    key: "3",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
  {
    key: "4",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
  {
    key: "5",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
  {
    key: "6",
    tag_account: "23907461",
    license_plate: "MH01BT8433",
    total_trips: 26,
    total_cost: 1024,
  },
];

const FastTagTable = () => {
  const { q, pagination } = useAppSelector((state) => state.database);

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IFastTagTableData[]
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
      columns={FASTTAG_TABLE}
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
          onPageChange={() => {
            // dispatch(setPagination())
          }}
        />
      )}
    />
  );
};

export default FastTagTable;
