/* eslint-disable */
import {
  Avatar,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import CustomPagination from "../Common/Pagination";
import { CopyOutlined, MoreOutlined } from "@ant-design/icons";

import {
  setIsViewDrawerClose,
  setIsViewDrawerOpen,
} from "../../redux/slices/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../types/store";
import ViewLogs from "./ViewLogs";

import MarkedAttendance from "./MarkAttendance";

function ReturnItems(row: any) {
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <MarkedAttendance />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            dispatch(setIsViewDrawerOpen());
          }}
        >
          <Space>
            <CopyOutlined twoToneColor="#52c41a" />
            View duty logs
          </Space>
        </div>
      ),
    },
  ];
  return items;
}

const columns: TableColumnsType<any> = [
  {
    title: "Full Name",
    width: 300,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (value, row) => {
      return (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar>{value[0]}</Avatar>
          {value}
        </div>
      );
    },
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    sorter: true,
  },
  {
    title: "date 1",
    dataIndex: "attendance",
    key: "1",

    render: (value, row) => (
      <div
        style={{
          background: value === "P" ? "#DCFAE6" : "#FEE4E2",
          color: value === "P" ? "#079455" : "#D92D20",
          padding: "2rem",
          margin: "-1rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 22,
        }}
      >
        {value}
      </div>
    ),
  },
  { title: "date 2", dataIndex: "attendance", key: "2" },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (_, row) => (
      <div>
        <Dropdown menu={{ items: ReturnItems(row) }}>
          <MoreOutlined />
        </Dropdown>
      </div>
    ),
  },
];
const pagination = {
  total: 30,
  page: 1,
  limit: 10,
};
const dataSource = [
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "2", name: "Ethan", age: 40, attendance: "A" },
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "1", name: "Olivia", age: 32, attendance: "A" },
];
const AttendanceTable = () => {
  const dispatch = useAppDispatch();
  const { filters, isViewDrawerOpen } = useAppSelector(
    (state: RootState) => state.attendance
  );

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        footer={() => (
          <CustomPagination
            total={pagination?.total ?? 0}
            current={pagination?.page ?? 1}
            pageSize={pagination.limit ?? 10}
            onPageChange={(page: number) => {}}
          />
        )}
      />
      <Drawer
        title="Basic Drawer"
        onClose={() => {
          dispatch(setIsViewDrawerClose());
        }}
        width={"700px"}
        open={isViewDrawerOpen}
      >
        <ViewLogs />
      </Drawer>
    </>
  );
};

export default AttendanceTable;
