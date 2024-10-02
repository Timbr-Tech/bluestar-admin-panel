/* eslint-disable */
import cn from "classnames";
import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>Dashboard</div>
          <div className={styles.text}>
            An overview of all company operations
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
