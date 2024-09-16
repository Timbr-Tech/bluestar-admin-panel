/* eslint-disable */
import cn from "classnames";
import { useState, ChangeEvent } from "react";
import { BOOKINGS_TABS } from "../../constants/bookings";
import styles from "./index.module.scss";
import SecondaryBtn from "../../components/SecondaryBtn";
import PrimaryBtn from "../../components/PrimaryBtn";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import BookingsTable from "../../components/BookingsTable";
import { DatePicker, Drawer, Input, Radio } from "antd";
import AddNewBookingForm from "../../components/Bookings/AddNewBooking/AddNewBookingForm";

const { RangePicker } = DatePicker;

const BookingsTabs = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <Radio.Group
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        {BOOKINGS_TABS?.map((item) => (
          <Radio.Button value={item.name}>{item.name}</Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openAddDrawer, setOpenAddDrawer] = useState<boolean>(false);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>Bookings</div>
          <div className={styles.text}>
            Create and manage your bookings from here
          </div>
        </div>
        <div className={styles.btnContainer}>
          <SecondaryBtn onClick={() => {}} btnText="All Duties" />
          <PrimaryBtn
            LeadingIcon={PlusOutlined}
            onClick={() => {
              setOpenAddDrawer(true);
            }}
            btnText="Add bookings"
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <BookingsTabs />

        <div className={styles.searchContainer}>
          <Input
            prefix={<SearchOutlined />}
            value={searchTerm}
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
        <hr />
        <BookingsTable />
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
        onClose={() => {
          setOpenAddDrawer(false);
        }}
        open={openAddDrawer}
      >
        <div>
          <AddNewBookingForm />
        </div>
      </Drawer>
    </div>
  );
};

export default Bookings;
