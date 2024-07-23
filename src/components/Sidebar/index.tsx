/* eslint-disable */
import { useNavigate, Link } from "react-router-dom";
import { Tooltip } from "antd";
import { ReactComponent as Dashboard } from "../../icons/homeLine.svg";
import { ReactComponent as Database } from "../../icons/database.svg";
import { ReactComponent as Drivers } from "../../icons/drivers.svg";
import { ReactComponent as BookingsIcon } from "../../icons/bookings.svg";
import { ReactComponent as VehicleRename } from "../../icons/VehicleRename.svg";
import { ReactComponent as Availability } from "../../icons/Availability.svg";
import { ReactComponent as Logo } from "../../icons/TempLogo.svg";
import { RouteName } from "../../constants/routes";
import styles from "./index.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <Link to={RouteName.HOME}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>
      <div className={styles.iconsContainer}>
        <Tooltip placement="right" title={"Dashboard"}>
          <Link to={RouteName.DASHBOARD}>
            <div className={styles.icon}>
              <Dashboard className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Bookings"}>
          <Link to={RouteName.BOOKINGS}>
            <div className={styles.icon}>
              <BookingsIcon className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Database"}>
          <Link to={RouteName.DATABASE}>
            <div className={styles.icon}>
              <Database className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Drivers attendance & Payroll"}>
          <Link to={RouteName.DRIVERS}>
            <div className={styles.icon}>
              <Drivers className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Vehicle Expense"}>
          <Link to={RouteName.VEHICLE_EXPENSE}>
            <div className={styles.icon}>
              <VehicleRename className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
        <Tooltip placement="right" title={"Availability"}>
          <Link to={RouteName.AVAILABILITY}>
            <div className={styles.icon}>
              <Availability className={styles.svgIcon} />
            </div>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
