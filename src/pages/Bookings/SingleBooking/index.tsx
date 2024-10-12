/* eslint-disable */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Radio, Input, Form, DatePicker } from "antd";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingsTable from "../../../components/BookingsTable";
import PrimaryBtn from "../../../components/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn";
import { BOOKINGS_TABS } from "../../../constants/bookings";
import { useAppDispatch } from "../../../hooks/store";
import {
  setBookingFilter,
  setIsAddEditDrawerOpen,
} from "../../../redux/slices/bookingSlice";
import { RootState } from "../../../types/store";
import styles from "../index.module.scss";
import classNames from "classnames";
const { RangePicker } = DatePicker;
const BookingsTabs = () => {
  // const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state.booking);

  return (
    <div>
      <Radio.Group
        value={filters.status}
        onChange={(e) => {
          // setFilter(e.target.value);
          dispatch(setBookingFilter({ status: e.target.value }));
        }}
      >
        {[
          {
            id: 1,
            name: "All",
            type: "all",
          },
          { id: 2, name: "Booked", type: "booked" },
          { id: 2, name: "Alloted", type: "alloted" },
          { id: 2, name: "Dispatched", type: "dispatched" },
          { id: 3, name: "On-Going", type: "on-going" },
          { id: 4, name: "Completed", type: "completed" },
          { id: 5, name: "Billed", type: "billed" },
          { id: 6, name: "Cancelled", type: "cancelled" },
        ]?.map((item) => (
          <Radio.Button
            onClick={() => {
              dispatch(setBookingFilter({ status: item.type }));
            }}
            key={item.type}
            value={item.type}
          >
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group>
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
          <div className={styles.heading}>Bookings :{bookingId}</div>
          <div className={styles.text}>
            Create and manage your bookings from here
          </div>
        </div>
        <div className={styles.btnContainer}>
          <SecondaryBtn onClick={() => {}} btnText="Add Duty" />
          <PrimaryBtn
            LeadingIcon={PlusOutlined}
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
        {/* <Divider /> */}
        <BookingsTable />
      </div>
    </div>
  );
};

export default SingleBookings;
