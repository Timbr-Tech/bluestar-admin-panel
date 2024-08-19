import { BOOKINGS_TABLE } from "../../constants/bookings";
import styles from "./index.module.scss";

interface IBookingsTableData {
  key: React.Key;
  start_date: string;
  customer: string;
  passenger: string;
  vehicle_group: string;
  duty_type: string;
  duties: string;
  status: string;
}

const BookingsTable = () => {
  return <div className={styles.container}></div>;
};

export default BookingsTable;
