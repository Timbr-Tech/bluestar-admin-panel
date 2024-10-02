/* eslint-disable */
import {
  Avatar,
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  Flex,
  MenuProps,
  Popover,
  Radio,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import CustomPagination from "../Common/Pagination";
import { CopyOutlined, EditFilled, MoreOutlined } from "@ant-design/icons";
import row from "antd/es/row";
import { useState } from "react";
import {
  setIsViewDrawerClose,
  setIsViewDrawerOpen,
} from "../../redux/slices/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../types/store";
import { divide } from "lodash";

const MarkedAttendance = () => {
  const [open, setOpen] = useState(false);
  const options = [
    { label: "Today", value: "today" },
    { label: "Select Date", value: "selectDate" },
  ];
  const hide = () => {
    setOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`Selected month: ${value}`);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <div style={{ width: "100%" }}>
          {/* <a onClick={hide}>Close</a> */}
          <Flex vertical gap="middle">
            <Radio.Group
              options={options}
              defaultValue="today"
              optionType="button"
              buttonStyle="solid"
              style={{ width: "100%" }}
            />
          </Flex>
          <DatePicker
            style={{
              width: "100%",
              marginTop: "0.5rem",
              overflow: "scroll",
            }}
            multiple
            allowClear
            maxTagCount="responsive"
            onChange={handleChange}
          />
          <Flex
            style={{
              marginTop: "0.5rem",
            }}
            gap="middle"
          >
            <Button>Mark Absent</Button>
            <Button type="primary">Mark Present</Button>
          </Flex>
        </div>
      }
      title={
        <div>
          <p>Marked attendance</p>
          <small>For Shadab</small>
        </div>
      }
      trigger="click"
      open={open}
      arrow={false}
      onOpenChange={handleOpenChange}
    >
      <div>
        <Space>
          <EditFilled twoToneColor="#52c41a" />
          Marked Attendance
        </Space>
      </div>
    </Popover>
  );
};
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
    render: () => (
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
        {[1, 2, 3, 4].map(() => (
          <div>
            <h4
              style={{
                margin: "1rem 0rem",
              }}
            >
              Aug 28, 2024
            </h4>
            <Table
              showHeader={false}
              bordered
              pagination={false}
              columns={[
                {
                  dataIndex: "id",
                  key: "id",
                  render: (value: any, row: any) => {
                    return (
                      <div>
                        <p>{value}</p>
                        <p>{row["time"]}</p>
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "vehicleName",
                  key: "vehicleName",
                  render: (value: any, row: any) => {
                    return (
                      <div>
                        <p>{value}</p>
                        <p>{row["vehicleNumber"]}</p>
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "status",
                  key: "status",
                  render: (value) => {
                    if (value === "alloted") {
                      return <Tag color="yellow">{value}</Tag>;
                    } else if (value === "completed") {
                      return <Tag color="green">{value}</Tag>;
                    } else {
                      return <Tag color="blue">{value}</Tag>;
                    }
                  },
                },
                {
                  title: "Action",
                  key: "operation",
                  width: 100,
                  render: () => (
                    <div>
                      <Dropdown menu={{ items: ReturnItems(row) }}>
                        <MoreOutlined />
                      </Dropdown>
                    </div>
                  ),
                },
              ]}
              dataSource={[
                {
                  id: "#2387293",
                  time: "5:00 PM",
                  vehicleName: "Toyota Innova",
                  vehicleNumber: "MH01 4656",
                  status: "alloted",
                },
                {
                  id: "#2387293",
                  time: "5:00 PM",
                  vehicleName: "Toyota Innova",
                  vehicleNumber: "MH01 4656",
                  status: "dispatched",
                },
                {
                  id: "#2387293",
                  time: "5:00 PM",
                  vehicleName: "Toyota Innova",
                  vehicleNumber: "MH01 4656",
                  status: "completed",
                },
              ]}
            />
          </div>
        ))}
      </Drawer>
    </>
  );
};

export default AttendanceTable;
