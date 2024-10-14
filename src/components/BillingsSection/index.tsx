/* eslint-disable */
import { ReactComponent as ArrowLeftOutlined } from "../../icons/arrow-left-blue.svg";
import styles from "./index.module.scss";

interface IBillingsSection {
  isEdit: boolean;
  isInvoice: boolean;
}

const BillingsSection = ({ isEdit, isInvoice }: IBillingsSection) => {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <a href="/billings" className={styles.backBtn}>
          <ArrowLeftOutlined />
          {isInvoice ? "Back to Invoices" : "Back to Receipst"}
        </a>
        <div className={styles.header}>
          {isInvoice ? "Create invoice" : "Create receipt"}
        </div>
      </div>
    </div>
  );
};

export default BillingsSection;
