/* eslint-disable */

import { ChangeEventHandler } from "react";
import styles from "./index.module.scss";

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
    <div className={styles.container}>
      <LeadingIcon />
      <input
        value={value}
        onChange={onChange}
        className={styles.inputContainer}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchComponent;
