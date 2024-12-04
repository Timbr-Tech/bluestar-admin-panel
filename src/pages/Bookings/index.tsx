/* eslint-disable */
import cn from "classnames";
import { useState, ChangeEvent } from "react";
import { BOOKINGS_TABS } from "../../constants/bookings";
import styles from "./index.module.scss";
import SecondaryBtn from "../../components/SecondaryBtn";
import PrimaryBtn from "../../components/PrimaryBtn";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import BookingsTable from "../../components/BookingsTable";
import { Button, DatePicker, Drawer, Form, Input, Radio } from "antd";
import AddNewBookingForm from "../../components/Bookings/AddNewBooking/AddNewBookingForm";
import {
  setIsAddEditDrawerClose,
  setIsAddEditDrawerOpen,
  setBookingFilter,
  setIsEditingBooking,
} from "../../redux/slices/bookingSlice";
import { ReactComponent as CrossIcon } from "../../icons/x.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";
import { useAppDispatch } from "../../hooks/store";
import { RouteName } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

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

const Bookings = () => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const debouncedSearch = useDebounce(searchTerm, 300);
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
  const navigate = useNavigate();

  const handleCloseSidePanel = () => {
    dispatch(setIsAddEditDrawerClose());
    dispatch(setIsEditingBooking(false));
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
          <SecondaryBtn
            onClick={() => {
              navigate(RouteName.DUTIES);
            }}
            btnText="All Duties"
          />
          <PrimaryBtn
            LeadingIcon={PlusOutlined}
            onClick={() => {
              dispatch(setIsAddEditDrawerOpen());
              dispatch(setIsEditingBooking(false));
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
            <span
              onClick={() => {
                dispatch(setBookingFilter({ search: undefined }));
              }}
              style={{
                cursor: "pointer",
              }}
            >
              clear
            </span>
          </div>
        </div>
        {/* <Divider /> */}
        <BookingsTable />
      </div>
      <Drawer
        destroyOnClose
        size="large"
        closable={false} // Remove the default close button
        mask
        title={
          <div className={styles.formHeader}>
            <div className={styles.header}>
              {!isEditingBooking ? "Add New Booking" : "Edit Booking"}
            </div>
            <div className={styles.primaryText}>
              Fill your booking details here
              {isEditingBooking.toString()}
            </div>
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
        open={isAddEditDrawerOpen}
      >
        <button className={styles.closeBtn} onClick={handleCloseSidePanel}>
          <CrossIcon />
        </button>
        <div>
          {formStep == 0 && (
            <AddNewBookingForm
              form={form}
              isEditable={isEditingBooking}
              initialData={currentSelectedBooking}
            />
          )}
          {formStep == 1 && <h1>step 1</h1>}
        </div>
      </Drawer>
    </div>
  );
};

export default Bookings;
