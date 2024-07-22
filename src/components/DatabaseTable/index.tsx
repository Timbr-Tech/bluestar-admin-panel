/* eslint-disable */
import { useState } from "react";
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
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerText}>
          <div className={styles.headerPrimary}>{item.name}</div>
          <div className={styles.headerSecondary}>{item.text}</div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTable;
