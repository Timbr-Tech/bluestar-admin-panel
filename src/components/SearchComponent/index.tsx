/* eslint-disable */

import { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
interface ISearchComponent {
  LeadingIcon: any;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchComponent = ({
  value,
  onChange,
  LeadingIcon,
  placeholder,
}: ISearchComponent) => {
  return (
    <Input
      value={value}
      prefix={<SearchOutlined />}
      onChange={onChange}
      allowClear
      className={styles.inputContainer}
      placeholder={placeholder}
    />
  );
};

export default SearchComponent;
