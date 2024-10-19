/* eslint-disable */
import cn from "classnames";
import { useState, ChangeEvent, useEffect } from "react";
import { BOOKINGS_TABS } from "../../constants/bookings";
import styles from "./index.module.scss";
import SecondaryBtn from "../../components/SecondaryBtn";
import PrimaryBtn from "../../components/PrimaryBtn";
import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import BookingsTable from "../../components/BookingsTable";
import { Button, DatePicker, Drawer, Form, Input, Radio } from "antd";
import AddNewBookingForm from "../../components/Bookings/AddNewBooking/AddNewBookingForm";
import {
  setIsAddEditDrawerClose,
  setIsAddEditDrawerOpen,
  setBookingFilter,
  setIsEditingBooking,
} from "../../redux/slices/bookingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";
import { useAppDispatch } from "../../hooks/store";
import SingleBookingsTable from "../../components/BookingsTable/SingleBooking";

const { RangePicker } = DatePicker;

const BookingsTabs = () => {
  // const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state.booking);

  return (
    <div className={styles.tabsContainer}>
      {BOOKINGS_TABS?.map((item) => (
        <button
          className={cn(styles.tab, {
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

const AllDuties = () => {
  const dispatch = useAppDispatch();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setSearchTerm(value);
    dispatch(setBookingFilter({ search: value }));
  };

  const {
    isAddEditDrawerOpen,
    isEditingBooking,
    filters,
    currentSelectedBooking,
  } = useSelector((state: RootState) => state.booking);

  const [form] = Form.useForm();
  const [formStep, setFormSetp] = useState(0);

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>All Duties</div>
          <div className={styles.text}>Manage all duties from here </div>
        </div>
        <div className={styles.btnContainer}>
          <MoreOutlined />
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
        <SingleBookingsTable />
      </div>
      <Drawer
        destroyOnClose
        size="large"
        mask
        title={
          <div>
            <div>Add New Booking</div>
            <small>Fill your booking details here</small>
          </div>
        }
        footer={
          <div className={styles.drawerFooter}>
            <Button>Cancel</Button>
            <Button
              onClick={() => {
                // handleFormSubmit();
                // form.validateFields();
                // if success make step2
                form.submit();
              }}
              type="primary"
            >
              Save
            </Button>
          </div>
        }
        onClose={() => {
          dispatch(setIsAddEditDrawerClose());
          dispatch(setIsEditingBooking(true));
        }}
        open={isAddEditDrawerOpen}
      >
        <div>
          <AddNewBookingForm
            form={form}
            // handleFormSubmit={(value) => {
            //   // console.log("value", value);
            // }}
            isEditable={isEditingBooking}
            initialData={currentSelectedBooking}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default AllDuties;
