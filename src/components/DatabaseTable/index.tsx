/* eslint-disable */
import { useState, ChangeEvent } from "react";
import SearchComponent from "../SearchComponent";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
import styles from "./index.module.scss";

interface IDatabaseItem {
  id: number;
  name: string;
  text: string;
}

interface IDatabaseTable {
  item: IDatabaseItem;
}

const DatabaseTable = ({ item }: IDatabaseTable) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerText}>
          <div className={styles.headerPrimary}>{item.name}</div>
          <div className={styles.headerSecondary}>{item.text}</div>
        </div>
        <SearchComponent
          value={searchTerm}
          onChange={searchHandler}
          LeadingIcon={SearchIcon}
          placeholder={"Search by duty type"}
        />
      </div>
    </div>
  );
};

export default DatabaseTable;
