/* eslint-disable */
import cn from "classnames";
import { Input, DatePicker } from "antd";
import styles from "./index.module.scss";

const Billings = () => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Billing</div>
        <div className={styles.text}>
          Manage your source of billing actions here
        </div>
      </div>
    </div>
  );
};

export default Billings;
