/* eslint-disable */
import { useState, ChangeEvent } from "react";
import SearchComponent from "../SearchComponent";
import { Dropdown } from "antd";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as DotsIcon } from "../../icons/dots.svg";
import { ReactComponent as FileDownloadIcon } from "../../icons/fileDownload.svg";
import { ReactComponent as UploadCloud } from "../../icons/uploadCloud.svg";
import DutyTypeTable from "./DutyTypeTable";
import AllowancesTable from "./AllowancesTable";
import BankAccountsTable from "./BankAccountsTable";
import TaxesTable from "./TaxesTable";
import VehicleGroupTable from "./VehicleGroupTable";
import CustomerTable from "./CustomerTable";
import DriversTable from "./DriversTable";
import VehicleTable from "./VehicleTable";
import PrimaryBtn from "../PrimaryBtn";
import styles from "./index.module.scss";

interface IDatabaseItem {
  id: number;
  name: string;
  type: string;
  text: string;
}

interface IDatabaseTable {
  item: IDatabaseItem;
  handleOpenSidePanel: () => void;
}

const DatabaseTable = ({ item, handleOpenSidePanel }: IDatabaseTable) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const vehicleItems = [
    {
      key: "0",
      label: (
        <div className={styles.item}>
          <UploadCloud />
          Import vehicles
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className={styles.item}>
          <FileDownloadIcon />
          Export vehicles
        </div>
      ),
    },
  ];

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
      case "allowances":
        return <AllowancesTable />;
    }
  };

  const renderSearchText = () => {
    switch (item.type) {
      case "duty_types":
        return "duty type";
      case "vehicle_groups":
        return "vehicle group name";
      case "customers":
        return "name, GST number, phone number";
      case "drivers":
        return "name or phone";
      case "vehicles":
        return "model name, number";
      case "bank_accounts":
        return "name, account number, bank name";
      case "taxes":
        return "tax name or percentage";
      case "allowances":
        return "allowances";
    }
  };

  const renderBtnText = () => {
    switch (item.type) {
      case "duty_types":
        return "duty type";
      case "vehicle_groups":
        return "vehicle group";
      case "customers":
        return "customer";
      case "drivers":
        return "driver";
      case "vehicles":
        return "vehicle";
      case "bank_accounts":
        return "bank account";
      case "taxes":
        return "tax type";
      case "allowances":
        return "allowance";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerText}>
          <div className={styles.headerPrimary}>{item.name}</div>
          <div className={styles.headerSecondary}>{item.text}</div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <SearchComponent
              value={searchTerm}
              onChange={searchHandler}
              LeadingIcon={SearchIcon}
              placeholder={`Search by ${renderSearchText()}`}
            />
          </div>
          <PrimaryBtn
            LeadingIcon={PlusIcon}
            btnText={`Add ${renderBtnText()}`}
            onClick={handleOpenSidePanel}
          />
          <Dropdown menu={{ items: vehicleItems }} trigger={["click"]}>
            <DotsIcon />
          </Dropdown>
        </div>
      </div>
      <div className={styles.tableContainer}>{renderComponent()}</div>
    </div>
  );
};

export default DatabaseTable;
