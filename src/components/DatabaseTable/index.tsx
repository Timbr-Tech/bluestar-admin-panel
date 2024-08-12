/* eslint-disable */
import { useState, ChangeEvent } from "react";
import SearchComponent from "../SearchComponent";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
import DutyTypeTable from "./DutyTypeTable";
import AllowancesTable from "./AllowancesTable";
import BankAccountsTable from "./BankAccountsTable";
import CompaniesTable from "./CompaniesTable";
import TaxesTable from "./TaxesTable";
import VehicleGroupTable from "./VehicleGroupTable";
import CustomerTable from "./CustomerTable";
import DriversTable from "./DriversTable";
import VehicleTable from "./VehicleTable";
import styles from "./index.module.scss";

interface IDatabaseItem {
  id: number;
  name: string;
  type: string;
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

  console.log(item, "item");

  const renderComponent = () => {
    switch (item.type) {
      case "duty_types":
        return <DutyTypeTable />;
      case "vehicle_groups":
        return <VehicleGroupTable />;
      case "customers":
        return <CustomerTable />;
      case "drivers":
        return <DriversTable />;
      case "vehicles":
        return <VehicleTable />;
      case "bank_accounts":
        return <BankAccountsTable />;
      case "taxes":
        return <TaxesTable />;
      case "companies":
        return <CompaniesTable />;
      case "allowances":
        return <AllowancesTable />;
    }
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
      <div className={styles.tableContainer}>{renderComponent()}</div>
    </div>
  );
};

export default DatabaseTable;
