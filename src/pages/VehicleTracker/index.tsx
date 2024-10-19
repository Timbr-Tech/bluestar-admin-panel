/* eslint-disable */
import cn from "classnames";
import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";

import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Form, Input } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "../../types/store";
import { useAppDispatch } from "../../hooks/store";
import {
  setIsViewDrawerOpen,
  setVehicleTrackerFilter,
} from "../../redux/slices/vehicleTrackerSlice";
import ExpenseTable from "../../components/VehicleTracker/tables/Expense";
import FuelsTable from "../../components/VehicleTracker/tables/Fuels";
import LoansTable from "../../components/VehicleTracker/tables/Loans";
import AverageTable from "../../components/VehicleTracker/tables/Average";

const tab = [
  {
    name: "Expense",
    type: "expense",
    desc: "Create and manage your vehicle expenses here",
  },
  {
    name: "Fuel",
    type: "fuel",
    desc: "Create and manage your Fuel expenses here",
  },
  {
    name: "Loans",
    type: "loans",
    desc: "Create and manage your loan expenses here",
  },
  {
    name: "Average",
    type: "average",
    desc: "Create and manage your average expenses here",
  },
];
const VehicleTabs = ({ setDescVal }: any) => {
  // const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state.vehicleTracker);

  return (
    <div>
      {tab?.map((item) => (
        <Button
          style={{
            border: "0px",
            boxShadow: "0 0 0 rgb(0, 0, 0)",
            padding: "1.5rem",
            fontWeight: "700",
            fontSize: "1rem",
            background: filters.currentTab === item.type ? "#F9F5FF" : "",
            color: filters.currentTab === item.type ? "#6941C6" : "",
          }}
          onClick={() => {
            dispatch(setVehicleTrackerFilter({ currentTab: item.type }));
            setDescVal(item.desc);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

const VehicleTrackerPage = () => {
  const dispatch = useAppDispatch();
  const [desc, setDesc] = useState(tab[0].desc);
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setSearchTerm(value);
    dispatch(setVehicleTrackerFilter({ search: value }));
  };

  const { filters, isViewDrawerOpen } = useSelector(
    (state: RootState) => state.vehicleTracker
  );

  const [form] = Form.useForm();

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div>
          <div className={styles.heading}>Vehicle Tracker</div>
          <div className={styles.text}>
            {"Manage your vehicle’s expenses and average here"}
          </div>
        </div>
        <div className={styles.btnContainer}>
          <MoreOutlined />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <VehicleTabs setDescVal={(val: string) => setDesc(val)} />

        <div className={styles.searchContainer}>
          <div>
            <p className={styles.TabHeading}>{filters.currentTab}</p>
            <p>{desc}</p>
          </div>

          <div className={styles.inputContainer}>
            <Input
              prefix={<SearchOutlined />}
              value={filters.search}
              onChange={searchHandler}
              className={styles.input}
              placeholder="Search by name..."
            />
            <Button type="primary">+ Add Expenses</Button>
          </div>
        </div>

        {filters.currentTab === "expense" && (
          <ExpenseTable handleOpenSidePanel={() => {}} />
        )}
        {filters.currentTab === "fuel" && (
          <FuelsTable handleOpenSidePanel={() => {}} />
        )}
        {filters.currentTab === "loans" && (
          <LoansTable handleOpenSidePanel={() => {}} />
        )}
        {filters.currentTab === "average" && (
          <AverageTable handleOpenSidePanel={() => {}} />
        )}
      </div>
      <Drawer
        destroyOnClose
        size="large"
        mask
        title={
          <div>
            <div>Add New </div>
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
          dispatch(setIsViewDrawerOpen());
          //   dispatch(setIsEditingBooking(true));
        }}
        open={isViewDrawerOpen}
      >
        <div>
          <h1>HI</h1>
        </div>
      </Drawer>
    </div>
  );
};

export default VehicleTrackerPage;
