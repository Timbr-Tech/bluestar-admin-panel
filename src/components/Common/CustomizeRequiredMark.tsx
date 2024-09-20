/* eslint-disable */
import { Space } from "antd";

const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <Space>
    {label}
    {required && <span style={{ color: "red" }}>*</span>}
  </Space>
);

export default CustomizeRequiredMark;
