/* eslint-disable */
import { Select, Radio, Spin, Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import type { RadioChangeEvent } from "antd";
import {
  getVehicleGroupOptions,
  updateDutyType,
  addDutyType,
} from "../../../redux/slices/databaseSlice";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { notification } from "antd";
import { omit } from "lodash";
import { DUTY_TYPES_TYPE } from "../../../constants/database";
import { ReactComponent as HelpCircle } from "../../../icons/help-circle.svg";
import { SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IDutyForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const rowsArray = [
  {
    vehicleGroup: "Swift Dzire/Etios",
    baseRate: 2,
    extraKmRate: 3,
    extraHrRate: 4,
  },
  {
    vehicleGroup: "Toyota Innova",
    baseRate: 2,
    extraKmRate: 3,
    extraHrRate: 4,
  },
  {
    vehicleGroup: "Mini hatchbacks",
    baseRate: 2,
    extraKmRate: 3,
    extraHrRate: 4,
  },
];

const DutyTypeForm = ({ handleCloseSidePanel }: IDutyForm) => {
  const [items, setItems] = useState(DUTY_TYPES_TYPE);
  const [value, setValue] = useState("P2P");
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const [dutyType, setDutyType] = useState("");
  const [name, setName] = useState("");
  const {
    vehicleGroupOptionStates,
    selectedDutyType,
    updatedDutyTypeStates,
    dutyTypeStates,
    vehicleGroupOption,
  } = useAppSelector((state) => state.database);
  const [vehicleGroupDataArray, setVehicleGroupDataArray] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getVehicleGroupOptions({ page: "1", size: "2" }));
  }, []);

  useEffect(() => {
    if (Object.keys(selectedDutyType).length) {
      const tempArr = selectedDutyType?.data?.pricing?.map((data: any) => {
        return {
          name: data?.vehicleGroup?.name,
          vehicleGroupId: data?._id,
          baseRate: data?.baseRate,
          extraKmRate: data?.extraKmRate,
          extraHrRate: data?.extraKmRate,
        };
      });

      setVehicleGroupDataArray(tempArr);
      setDutyType(selectedDutyType?.data?.type);
      setName(selectedDutyType?.data?.name);
      setValue(selectedDutyType?.data?.secondaryType);
    } else {
      const tempArr = vehicleGroupOption?.data?.map((data: any) => {
        return {
          name: data?.name,
          vehicleGroupId: data?._id,
          baseRate: 0,
          extraKmRate: 0,
          extraHrRate: 0,
        };
      });

      console.log(tempArr, "tempArr");

      setVehicleGroupDataArray(tempArr);
    }
  }, [vehicleGroupOption, selectedDutyType]);

  const handleSelectChange = (value: any) => {
    setDutyType(value);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
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

  const handleSave = () => {
    if (Object.keys(selectedDutyType).length) {
      console.log(
        vehicleGroupDataArray?.map((data: any) =>
          omit(
            {
              ...data,
              baseRate: Number(data.baseRate),
              extraKmRate: Number(data.extraKmRate),
              extraHrRate: Number(data.extraHrRate),
            },
            "name"
          )
        ),
        "Data"
      );
      dispatch(
        updateDutyType({
          payload: {
            name,
            type: dutyType,
            secondaryType: value,
            pricing: vehicleGroupDataArray?.map((data: any) =>
              omit(
                {
                  ...data,
                  baseRate: Number(data.baseRate),
                  extraKmRate: Number(data.extraKmRate),
                  extraHrRate: Number(data.extraHrRate),
                },
                "name"
              )
            ),
          },
          id: selectedDutyType?.data?._id,
        })
      );
    } else {
      dispatch(
        addDutyType({
          name,
          type: dutyType,
          secondaryType: value,
          pricing: vehicleGroupDataArray?.map((data: any) =>
            omit(
              {
                ...data,
                baseRate: Number(data.baseRate),
                extraKmRate: Number(data.extraKmRate),
                extraHrRate: Number(data.extraHrRate),
              },
              "name"
            )
          ),
        })
      );
    }
  };

  const handlePricingValueChange = (e: any, index: any) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    console.log(e.target.name, "e.target.name");
    if (regex.test(e.target.value)) {
      const tempVehicleGroupDataArray = vehicleGroupDataArray?.map(
        (data: any, i: any) => {
          if (i === index) {
            return { ...data, [e.target.name]: e.target.value };
          } else return data;
        }
      );
      setVehicleGroupDataArray(tempVehicleGroupDataArray);
    }
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      {(vehicleGroupOptionStates.loading || dutyTypeStates.loading) && (
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
          <div className={styles.header}>
            {Object.keys(selectedDutyType).length
              ? "Duty Type"
              : "New Duty Type"}
          </div>
          <div className={styles.primaryText}>
            {Object.keys(selectedDutyType).length
              ? "View duty type details"
              : "Add details of your duty type"}
          </div>
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
              onChange={handleSelectChange}
              value={dutyType}
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
              value={name}
              onChange={handleNameChange}
              placeholder="Enter Duty type name"
            />
          </div>
          <div className={styles.radio}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={"P2P"}>
                <div className={styles.radioContainer}>
                  <div className={styles.text}>Is Point to Point (P2P)?</div>
                  <div className={styles.secondary}>
                    Save my login details for next time.
                  </div>
                </div>
              </Radio>
              <Radio value={"G2G"}>
                <div className={styles.radioContainer}>
                  <div className={styles.text}>Is Garage to Garage (G2G)?</div>
                  <div className={styles.secondary}>
                    Save my login details for next time.
                  </div>
                </div>
              </Radio>
            </Radio.Group>
          </div>
          {dutyType && (
            <div className={styles.dutyTypeTable}>
              <div className={styles.columnsHeader}>
                {columnHeader?.map((column) => {
                  return <div className={styles.column}>{column?.name}</div>;
                })}
              </div>
              <div className={styles.rowsContainer}>
                {vehicleGroupDataArray?.map((row: any, index: any) => {
                  return (
                    <div className={styles.row}>
                      <div className={styles.vehicleGroup}>{row?.name}</div>
                      <div className={styles.rowItem}>
                        <input
                          className={styles.input}
                          value={row?.baseRate}
                          onChange={(e) => handlePricingValueChange(e, index)}
                          name={"baseRate"}
                        />
                      </div>
                      <div className={styles.rowItem}>
                        <input
                          className={styles.input}
                          value={row?.extraKmRate}
                          name={"extraKmRate"}
                          onChange={(e) => handlePricingValueChange(e, index)}
                        />
                      </div>
                      <div className={styles.rowItem}>
                        <input
                          className={styles.input}
                          value={row?.extraHrRate}
                          name={"extraHrRate"}
                          onChange={(e) => handlePricingValueChange(e, index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <Button
          type="primary"
          htmlType="submit"
          loading={updatedDutyTypeStates?.loading}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default DutyTypeForm;
