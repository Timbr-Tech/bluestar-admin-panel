/* eslint-disable */
import { Select, Dropdown, Form, Input, DatePicker } from "antd";
import PrimaryBtn from "../PrimaryBtn";
import CancelBtn from "../CancelBtn";
import type { MenuProps } from "antd";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as ArrowLeftOutlined } from "../../icons/arrow-left-blue.svg";
import InvoiceForm from "./InvoiceForm";

import styles from "./index.module.scss";
import { useState } from "react";

interface IBillingsSection {
  isEdit: boolean;
  isInvoice: boolean;
}

const BillingsSection = ({ isEdit, isInvoice }: IBillingsSection) => {
  const [dropdownValue, setDropdownValue] = useState("BlueStar Prime");

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <a href="/billings" className={styles.backBtn}>
          <ArrowLeftOutlined />
          {isInvoice ? "Back to Invoices" : "Back to Receipst"}
        </a>
        <div className={styles.headingSection}>
          <div className={styles.header}>
            {isInvoice ? "Create invoice" : "Create receipt"}
          </div>
          <div className={styles.leftHeader}>
            <div className={styles.text}>Billing as: </div>
            <Select value={dropdownValue} />
            <div className={styles.dash} />
            <CancelBtn btnText="Cancel" onClick={() => {}} />
            <PrimaryBtn
              btnText="Save Invoice"
              onClick={() => {}}
              LeadingIcon={CheckIcon}
            />
          </div>
        </div>
      </div>
      {isInvoice && <InvoiceForm />}
    </div>
  );
};

export default BillingsSection;
