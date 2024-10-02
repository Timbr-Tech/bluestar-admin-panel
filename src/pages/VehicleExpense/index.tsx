/* eslint-disable */
import cn from "classnames";
import styles from "./index.module.scss";

const VehicleExpense = () => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>Vehicle Tracker</div>
          <div className={styles.text}>
            Manage your vehicle’s expenses and average here
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleExpense;
