/* eslint-disable */
import cn from "classnames";
import styles from "./index.module.scss";

const Availability = () => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>Vehicle Availability</div>
          <div className={styles.text}>
            View your vehicles and their drivers availability here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
