/* eslint-disable */
import DatabaseTable from "../../components/DatabaseTable";
import { DATABASE_ITEMS } from "../../constants/database";
import cn from "classnames";
import DutyTypeForm from "../../components/DatabaseTable/DutyTypeTable/DutyTypeForm";
import { useState } from "react";
import { ReactComponent as CrossIcon } from "../../icons/x.svg";
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
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const handleNavClick = (data: IDatabaseItem) => {
    selectedItem(data);
  };

  const handleCloseSidePanel = () => {
    setOpenSidePanel(false);
  };

  const handleOpenSidePanel = () => {
    setOpenSidePanel(true);
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
      <DatabaseTable item={item} handleOpenSidePanel={handleOpenSidePanel} />
      <div
        className={cn(styles.formContainer, { [styles.open]: openSidePanel })}
      >
        <button className={styles.closeBtn} onClick={handleCloseSidePanel}>
          <CrossIcon />
        </button>
        <DutyTypeForm />
      </div>
    </div>
  );
};

export default Database;
