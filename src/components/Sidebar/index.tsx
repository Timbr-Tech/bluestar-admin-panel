/* eslint-disable */
import { Tooltip } from "antd";
import { ReactComponent as Dashboard } from "../../icons/homeLine.svg";
import { ReactComponent as Database } from "../../icons/database.svg";
import { ReactComponent as Drivers } from "../../icons/drivers.svg";
import { ReactComponent as BookingsIcon } from "../../icons/bookings.svg";
import { ReactComponent as VehicleRename } from "../../icons/VehicleRename.svg";
import { ReactComponent as Availability } from "../../icons/Availability.svg";
import { ReactComponent as Logo } from "../../icons/TempLogo.svg";
import styles from "./index.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.iconsContainer}>
        <Tooltip placement="right" title={"Dashboard"}>
          <div className={styles.icon}>
            <Dashboard className={styles.svgIcon} />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Bookings"}>
          <div className={styles.icon}>
            <BookingsIcon className={styles.svgIcon} />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Database"}>
          <div className={styles.icon}>
            <Database className={styles.svgIcon} />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Drivers attendance & Payroll"}>
          <div className={styles.icon}>
            <Drivers className={styles.svgIcon} />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Vehicle Expense"}>
          <div className={styles.icon}>
            <VehicleRename className={styles.svgIcon} />
          </div>
        </Tooltip>
        <Tooltip placement="right" title={"Availability"}>
          <div className={styles.icon}>
            <Availability className={styles.svgIcon} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
