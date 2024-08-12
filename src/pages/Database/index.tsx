/* eslint-disable */
import DatabaseTable from "../../components/DatabaseTable";
import { DATABASE_ITEMS } from "../../constants/database";
import cn from "classnames";
import { useState } from "react";
import styles from "./index.module.scss";

interface IDatabaseItem {
  id: number;
  name: string;
  type: string;
  text: string;
}

const Database = () => {
  const [item, selectedItem] = useState<IDatabaseItem>({
    id: 1,
    name: "Duty types",
    type: "duty_types",
    text: "Create and manage your duty types here",
  });

  const handleNavClick = (data: IDatabaseItem) => {
    selectedItem(data);
  };
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Database</div>
        <div className={styles.text}>
          Manage your source of truth from here.
        </div>
      </div>
      <ul className={styles.navContainer}>
        {DATABASE_ITEMS.map((dataBaseItem, index) => (
          <li
            key={index}
            className={cn(styles["navContainer__item"], {
              [styles.selected]: item.id === dataBaseItem.id,
            })}
            onClick={() => handleNavClick(dataBaseItem)}
          >
            {dataBaseItem.name}
          </li>
        ))}
      </ul>
      <DatabaseTable item={item} />
    </div>
  );
};

export default Database;
