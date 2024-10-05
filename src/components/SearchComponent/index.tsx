/* eslint-disable */

import { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import { Input } from "antd";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
interface ISearchComponent {
  LeadingIcon?: any;
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
      prefix={<SearchIcon />}
      suffix={<></>}
      onChange={onChange}
      allowClear
      className={"custom-search"}
      placeholder={placeholder}
    />
  );
};

export default SearchComponent;
