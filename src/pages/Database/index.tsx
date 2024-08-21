/* eslint-disable */
import DatabaseTable from "../../components/DatabaseTable";
import { DATABASE_ITEMS } from "../../constants/database";
import cn from "classnames";
import DutyTypeForm from "../../components/DatabaseTable/DutyTypeTable/DutyTypeForm";
import CustomerForm from "../../components/DatabaseTable/CustomerTable/CustomerForm";
import VehicleGroupForm from "../../components/DatabaseTable/VehicleGroupTable/VehicleGroupForm";
import DriversForm from "../../components/DatabaseTable/DriversTable/DriversForm";
import VehicleForm from "../../components/DatabaseTable/VehicleTable/VehicleForm";
import BankAccountForm from "../../components/DatabaseTable/BankAccountsTable/BankAccountForm";
import TaxesForm from "../../components/DatabaseTable/TaxesTable/TaxesForm";
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

  const renderComponent = () => {
    switch (item.type) {
      case "duty_types":
        return <DutyTypeForm />;
      case "vehicle_groups":
        return <VehicleGroupForm />;
      case "customers":
        return <CustomerForm />;
      case "drivers":
        return <DriversForm />;
      case "vehicles":
        return <VehicleForm />;
      case "bank_accounts":
        return <BankAccountForm />;
      case "taxes":
        return <TaxesForm />;
      // case "allowances":
      //   return <AllowancesTable />;
      default:
        <div></div>;
    }
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
        {renderComponent()}
      </div>
    </div>
  );
};

export default Database;
