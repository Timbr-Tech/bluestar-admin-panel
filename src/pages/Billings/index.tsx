/* eslint-disable */
import cn from "classnames";
import { Input, DatePicker } from "antd";
import SearchComponent from "../../components/SearchComponent";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import InvoiceTable from "../../components/InvoiceTable";
import ReceiptTable from "../../components/ReceiptTable";
import { useState } from "react";
import styles from "./index.module.scss";

const Billings = () => {
  const [tab, setTab] = useState("invoice");

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Billing</div>
        <div className={styles.text}>
          Manage your source of billing actions here
        </div>
        <div className={styles.headerBtns}>
          <button
            className={cn(styles.headerBtn, {
              [styles.selected]: tab === "invoice",
            })}
            onClick={() => setTab("invoice")}
          >
            Invoices
          </button>
          <button
            className={cn(styles.headerBtn, {
              [styles.selected]: tab === "receipt",
            })}
            onClick={() => setTab("receipt")}
          >
            Receipts
          </button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerText}>
            <div className={styles.headerPrimary}>
              {tab === "invoice" ? "Invoices" : "Receipts"}
            </div>
            <div className={styles.headerSecondary}>
              {tab === "invoice"
                ? "Create and manage your invoices here"
                : "Create and manage your receipts here"}
            </div>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <SearchComponent
                value={""}
                onChange={() => {}}
                LeadingIcon={SearchIcon}
                placeholder={
                  tab === "invoice"
                    ? `Search by customer, booked by, passenger`
                    : `Search by customer name, group, allowance`
                }
              />
            </div>
            <PrimaryBtn
              onClick={() => {}}
              LeadingIcon={PlusIcon}
              btnText={`Add ${tab}`}
            />
            {/* <Dropdown menu={{ items: vehicleItems }} trigger={["click"]}>
            <DotsIcon />
          </Dropdown> */}
          </div>
        </div>
        <div className={styles.table}>
          {tab === "invoice" ? <InvoiceTable /> : <ReceiptTable />}
        </div>
      </div>
    </div>
  );
};

export default Billings;
