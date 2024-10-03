/* eslint-disable */
import { EditFilled } from "@ant-design/icons";
import { Popover, Flex, Radio, DatePicker, Button, Space } from "antd";
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

export default MarkedAttendance;
