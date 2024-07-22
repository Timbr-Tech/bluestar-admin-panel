/* eslint-disable */
import styles from "./index.module.scss";
import { ReactComponent as Home } from "../../icons/homeLine.svg";
import { ReactComponent as Database } from "../../icons/database.svg";
import { ReactComponent as Drivers } from "../../icons/drivers.svg";
import { ReactComponent as BookingsIcon } from "../../icons/bookings.svg";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <div className={styles.icon}>
          <Home className={styles.svgIcon} />
        </div>
        <div className={styles.icon}>
          <BookingsIcon className={styles.svgIcon} />
        </div>
        <div className={styles.icon}>
          <Database className={styles.svgIcon} />
        </div>
        <div className={styles.icon}>
          <Drivers className={styles.svgIcon} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
