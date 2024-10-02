/* eslint-disable */
import { CopyOutlined, CheckOutlined, MoreOutlined } from "@ant-design/icons";
import {
  MenuProps,
  Space,
  TableColumnsType,
  Avatar,
  Dropdown,
  Table,
} from "antd";
import CustomPagination from "../Common/Pagination";
import row from "antd/es/row";

const RupeeIcon = () => (
  <span style={{ fontSize: "16px", marginRight: "4px" }}>₹</span>
);
function ReturnItemsPayroll(row: any) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => {}}>
          <Space>
            <RupeeIcon />
            Edit Driver Payment
          </Space>
        </div>
      ),
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
            View Expense logs
          </Space>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div onClick={() => {}}>
          <Space>
            <CheckOutlined twoToneColor="#52c41a" />
            Mark as paid
          </Space>
        </div>
      ),
    },
  ];
  return items;
}

const columnsPayroll: TableColumnsType<any> = [
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

          padding: "1rem",
          margin: "-1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </div>
    ),
  },
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
        <Dropdown menu={{ items: ReturnItemsPayroll(row) }}>
          <MoreOutlined />
        </Dropdown>
      </div>
    ),
  },
];
const dataSource = [
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "2", name: "Ethan", age: 40, attendance: "A" },
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "1", name: "Olivia", age: 32, attendance: "P" },
  { key: "1", name: "Olivia", age: 32, attendance: "A" },
];

const pagination = {
  total: 30,
  page: 1,
  limit: 10,
};
const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of tab ${id}`,
  };
});
const PayrollTable = () => {
  return (
    <Table
      pagination={false}
      columns={columnsPayroll}
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
  );
};

export default PayrollTable;
