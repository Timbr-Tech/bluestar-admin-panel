/* eslint-disable */
import DatabaseTable from "../../components/DatabaseTable";
import { DATABASE_ITEMS } from "../../constants/database";
import cn from "classnames";
import { RouteName } from "../../constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import DutyTypeForm from "../../components/DatabaseTable/DutyTypeTable/DutyTypeForm";
import CustomerForm from "../../components/DatabaseTable/CustomerTable/CustomerForm";
import VehicleGroupForm from "../../components/DatabaseTable/VehicleGroupTable/VehicleGroupForm";
import DriversForm from "../../components/DatabaseTable/DriversTable/DriversForm";
import VehicleForm from "../../components/DatabaseTable/VehicleTable/VehicleForm";
import BankAccountForm from "../../components/DatabaseTable/BankAccountsTable/BankAccountForm";
import TaxesForm from "../../components/DatabaseTable/TaxesTable/TaxesForm";
import AllowancesForm from "../../components/DatabaseTable/AllowancesTable/AllowancesForm";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const tempItem = DATABASE_ITEMS.find((item) => item.type === params.tabId);
    if (tempItem) selectedItem(tempItem);
  }, [params.type]);

  const handleNavClick = (data: IDatabaseItem) => {
    navigate(`${RouteName.DATABASE}/${data.type}`);
    selectedItem(data);
  };

  const handleCloseSidePanel = () => {
    setOpenSidePanel(false);
  };

  const handleOpenSidePanel = () => {
    setOpenSidePanel(true);
  };

  const renderComponent = () => {
    switch (params.tabId) {
      case "duty_types":
        return <DutyTypeForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "vehicle_groups":
        return <VehicleGroupForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "customers":
        return <CustomerForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "drivers":
        return <DriversForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "vehicles":
        return <VehicleForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "bank_accounts":
        return <BankAccountForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "taxes":
        return <TaxesForm handleCloseSidePanel={handleCloseSidePanel} />;
      case "allowances":
        return <AllowancesForm handleCloseSidePanel={handleCloseSidePanel} />;
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
