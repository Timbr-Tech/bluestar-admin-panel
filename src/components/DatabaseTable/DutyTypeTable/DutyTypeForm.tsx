/* eslint-disable */
import { Select, Radio, Spin } from "antd";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import type { RadioChangeEvent } from "antd";
import { getVehicleGroupOptions } from "../../../redux/slices/databaseSlice";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { notification } from "antd";
import { DUTY_TYPES_TYPE } from "../../../constants/database";
import { ReactComponent as HelpCircle } from "../../../icons/help-circle.svg";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IDutyForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const rowsArray = [
  {
    vehicleGroup: "Swift Dzire/Etios",
    baseRate: 2,
    extraKMRate: 3,
    extraHRRate: 4,
  },
  {
    vehicleGroup: "Toyota Innova",
    baseRate: 2,
    extraKMRate: 3,
    extraHRRate: 4,
  },
  {
    vehicleGroup: "Mini hatchbacks",
    baseRate: 2,
    extraKMRate: 3,
    extraHRRate: 4,
  },
];

const DutyTypeForm = ({ handleCloseSidePanel }: IDutyForm) => {
  const [items, setItems] = useState(DUTY_TYPES_TYPE);
  const [value, setValue] = useState(1);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const { vehicleGroupOptionStates } = useAppSelector(
    (state) => state.database
  );

  useEffect(() => {
    dispatch(getVehicleGroupOptions({ page: "1", size: "" }));
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Duty type added",
      description: "Duty type added to the database",
    });
  };

  const columnHeader = [
    { id: 1, name: "Vehicle Group" },
    { id: 2, name: "Base Rate" },
    { id: 3, name: "Extra KM rate" },
    { id: 4, name: "Extra HR rate" },
  ];

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      {vehicleGroupOptionStates.loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Duty Type</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Type</p>
              <sup>*</sup>
              <HelpCircle />
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={items.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Duty type name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Duty type name"
              defaultValue={"olivia@untitledui.com"}
            />
          </div>
          <div className={styles.radio}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>
                <div className={styles.radioContainer}>
                  <div className={styles.text}>Is Point to Point (P2P)?</div>
                  <div className={styles.secondary}>
                    Save my login details for next time.
                  </div>
                </div>
              </Radio>
              <Radio value={2}>
                <div className={styles.radioContainer}>
                  <div className={styles.text}>Is Garage to Garage (GTG)?</div>
                  <div className={styles.secondary}>
                    Save my login details for next time.
                  </div>
                </div>
              </Radio>
            </Radio.Group>
          </div>
          <div className={styles.dutyTypeTable}>
            <div className={styles.columnsHeader}>
              {columnHeader?.map((column) => {
                return <div className={styles.column}>{column?.name}</div>;
              })}
            </div>
            <div className={styles.rowsContainer}>
              {rowsArray?.map((row) => {
                return (
                  <div className={styles.row}>
                    <div className={styles.vehicleGroup}>
                      {row?.vehicleGroup}
                    </div>
                    <div className={styles.rowItem}>
                      <input
                        className={styles.input}
                        defaultValue={row?.baseRate}
                      />
                    </div>
                    <div className={styles.rowItem}>
                      <input
                        className={styles.input}
                        defaultValue={row?.extraKMRate}
                      />
                    </div>
                    <div className={styles.rowItem}>
                      <input
                        className={styles.input}
                        defaultValue={row?.extraHRRate}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn
          btnText="Save"
          onClick={() => {
            openNotificationWithIcon("success");
            handleCloseSidePanel();
          }}
        />
      </div>
    </div>
  );
};

export default DutyTypeForm;
