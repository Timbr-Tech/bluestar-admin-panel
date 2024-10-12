/* eslint-disable */
import { EditFilled, SearchOutlined } from "@ant-design/icons";
import { Radio, Input, DatePicker } from "antd";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PrimaryBtn from "../../../components/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn";
import { useAppDispatch } from "../../../hooks/store";
import {
  setBookingFilter,
  setIsAddEditDrawerOpen,
} from "../../../redux/slices/bookingSlice";
import { RootState } from "../../../types/store";
import styles from "../index.module.scss";
import { ReactComponent as ArrowLeftOutlined } from "../../../icons/arrow-left-blue.svg";
import classNames from "classnames";
import { BOOKINGS_DUTY_TABS } from "../../../constants/bookings";
import SingleBookingsTable from "../../../components/BookingsTable/SingleBooking";

const { RangePicker } = DatePicker;

const BookingsTabs = () => {
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state.booking);

  return (
    <div className={styles.tabsContainer}>
      {BOOKINGS_DUTY_TABS?.map((item) => (
        <button
          className={classNames(styles.tab, {
            [styles.selected]: item.type === filters.status,
          })}
          onClick={() => {
            dispatch(setBookingFilter({ status: item.type }));
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
const SingleBookings = () => {
  let { bookingId } = useParams();
  // const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state.booking);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setSearchTerm(value);
    dispatch(setBookingFilter({ search: value }));
  };

  return (
    <div className={classNames("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <a href="/bookings">
            <ArrowLeftOutlined />
            Back to all bookings
          </a>

          <div className={styles.heading}>{`Booking ID: ${bookingId}`}</div>
          <div className={styles.text}>12/06/2024 to 18/06/2024</div>
        </div>
        <div className={styles.btnContainer}>
          <SecondaryBtn onClick={() => {}} btnText="Add Duty" />
          <PrimaryBtn
            LeadingIcon={EditFilled}
            onClick={() => {
              dispatch(setIsAddEditDrawerOpen());
            }}
            btnText="Edit"
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <BookingsTabs />

        <div className={styles.searchContainer}>
          <Input
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={searchHandler}
            className={styles.inputContainer}
            placeholder="Search by name, number, duty type, city or booking id"
          />
          <div
            className="flex"
            style={{
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <RangePicker />
            <p>clear</p>
          </div>
        </div>
        <SingleBookingsTable />
      </div>
    </div>
  );
};

export default SingleBookings;
