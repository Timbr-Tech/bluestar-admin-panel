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
  getAttendance,
  setIsViewDrawerClose,
  setIsViewDrawerOpen,
} from "../../redux/slices/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../types/store";
import ViewLogs from "./ViewLogs";

import MarkedAttendance from "./MarkAttendance";
import { getPastSevenDays } from "../../utils/date";
import { useEffect, useMemo, useState } from "react";
import Dayjs from "dayjs";

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
const dataSource1 = [
  {
    date: "2024-12-21",
    driversPresent: [
      {
        _id: "67137e98481dc15d450d7774",
        name: "Jitan Sharma",
      },
    ],
  },
  {
    date: "2024-12-23",
    driversPresent: [
      {
        _id: "67137e98481dc15d450d7774",
        name: "Jitan Sharma",
      },
      {
        _id: "66f0380eb39aebd0d42635c9",
        name: "Shadab Ali",
      },
    ],
  },
  {
    date: "2024-12-12",
    driversPresent: [
      {
        _id: "66f0380eb39aebd0d42635c9",
        name: "Shadab Ali",
      },
    ],
  },
];

const AttendanceTable = () => {
  const pastSevenDays = getPastSevenDays();

  const [col, setCol] = useState(() =>
    pastSevenDays.map((each) => ({
      title: Dayjs(each).format("DD-MMM-YYYY"),
      key: "attendance",
      dataIndex: Dayjs(each).format("YYYY-MM-DD"),
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
    }))
  );
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

    ...col,

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
  const dispatch = useAppDispatch();
  const { filters, isViewDrawerOpen, attendance } = useAppSelector(
    (state: RootState) => state.attendance
  );
  useEffect(() => {
    dispatch(getAttendance({ ...filters, dates: pastSevenDays }));
  }, []);

  console.log(columns);
  const tableData = useMemo(() => {
    // Get unique drivers
    const drivers = Array.from(
      new Set(
        attendance.flatMap((item) =>
          item.driversPresent.map((driver) => driver._id)
        )
      )
    )
      .map((id) => {
        const driver = attendance
          .flatMap((item) => item.driversPresent)
          .find((d) => d._id === id);
        return driver ? { _id: driver._id, name: driver.name } : null;
      })
      .filter((driver): driver is any => driver !== null);

    // Create table data
    return drivers.map((driver) => {
      const rowData: any = {
        key: driver._id,
        name: driver.name,
      };

      // Add attendance for each date
      columns.forEach((column: any) => {
        if (
          column.dataIndex &&
          typeof column.dataIndex === "string" &&
          column.dataIndex !== "name"
        ) {
          const date = column.dataIndex;
          const attendanceData = attendance.find((item) => item.date === date);
          rowData[date] = attendanceData?.driversPresent.some(
            (d) => d._id === driver._id
          )
            ? "P"
            : "A";
        }
      });

      return rowData;
    });
  }, [attendance]);

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={tableData}
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
