/* eslint-disable */
import styles from "./index.module.scss";

const ReceiptForm = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={styles.header}>
            <div className={styles["header_1"]}>Receipt details</div>
            <div className={styles["header_2"]}>
              Fill customer and invoice details here
            </div>
          </div>
        </div>
        <div className={styles.customerContainer}>
          <div className={styles.customerHeading}>Customer details</div>
        </div>
        <div className={styles.invoicesContainer}>
          <div className={styles.invoiceHeading}>{`Invoice dates`}</div>
          <div className={styles.invoice}>
            <div className={styles.invoiceNumber}>
              <div className={styles.primary}>{`Invoice Number`}</div>
              <div className={styles.secondary}>{`GR2425-0005`}</div>
            </div>
            <div className={styles.invoiceNumber}>
              <div className={styles.primary}>{`Invoice Date`}</div>
              <div className={styles.secondary}>{`21/07/24`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={styles.header}>
            <div className={styles["header_1"]}>Preview</div>
            <div className={styles["header_2"]}>
              See your generated receipt here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptForm;
