/* eslint-disable */
import cn from "classnames";
import styles from "./index.module.scss";
import {
  Button,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Popover,
  Radio,
  Space,
  Table,
  TableColumnsType,
  Tabs,
} from "antd";
import CustomPagination from "../../components/Common/Pagination";
import {
  CheckCircleTwoTone,
  CopyOutlined,
  EditFilled,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import row from "antd/es/row";
import { useState } from "react";

const MarkedAttendance = () => {
  const [open, setOpen] = useState(false);
  const options = [
    { label: "Today", value: "today" },
    { label: "Select Date", value: "selectDate" },
  ];
  const hide = () => {
    setOpen(false);
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
            }}
            allowClear
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
        <div onClick={() => {}}>
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
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    sorter: true,
  },
  { title: "date 1", dataIndex: "attendance", key: "1" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
  { title: "date 2", dataIndex: "attendance", key: "2" },
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
const dataSource = [
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "2", name: "Ethan", age: 40, attendance: "A" },
];

const handleChange = (value: string) => {
  console.log(`Selected month: ${value}`);
};
const { RangePicker } = DatePicker;

const operations = (
  <div className={styles.extraTabComponent}>
    <Input
      style={{ width: 200 }}
      prefix={<SearchOutlined />}
      placeholder="Search by name or phone"
      type="search"
      allowClear
    />
    <RangePicker allowClear />
    <DatePicker allowClear onChange={handleChange} picker="month" />
  </div>
);
const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of tab ${id}`,
  };
});
const DriversAttendancePayroll = () => {
  const pagination = {
    total: 30,
    page: 1,
    limit: 10,
  };
  const { TabPane } = Tabs;

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Database</div>
        <div className={styles.text}>
          Manage your source of truth from here.
        </div>
      </div>
      <div className={styles.attendanceTable}>
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab="Attendance" key="attendance">
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
          </TabPane>
          <TabPane tab="Payroll" key="payroll">
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
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default DriversAttendancePayroll;
