/* eslint-disable */
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { Select, notification } from "antd";
import { useState, useMemo, useEffect, SetStateAction } from "react";
import {
  addNewAllowance,
  updateAllowance,
} from "../../../redux/slices/databaseSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { ALLOWANCES_TYPES, Allowance } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

interface IAllowancesForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const AllowancesForm = ({ handleCloseSidePanel }: IAllowancesForm) => {
  const [allowanceType, setAllowanceType] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const { selectedAllowance, updateAllowancesStates } = useAppSelector(
    (state) => state.database
  );
  const [rate, setRate] = useState<number>(0);

  const handleAllowanceType = (value: string) => {
    setAllowanceType(value);
  };

  const handleRateChange = (e: any) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setRate(value);
    }
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Allowance added",
      description: "Allowance added to the database",
    });
  };

  const allowanceLabel = useMemo(() => {
    return ALLOWANCES_TYPES.filter((type) => type.value === allowanceType)[0];
  }, [allowanceType]);

  const handleAddNewAllowance = () => {
    dispatch(
      addNewAllowance({
        rate: Number(rate),
        allowanceType: allowanceLabel?.label,
      })
    );
    openNotificationWithIcon("success");
    handleCloseSidePanel();
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Allowance</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Taxes</p>
            </div>
            <Select
              style={{ width: "100%" }}
              onChange={handleAllowanceType}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={ALLOWANCES_TYPES.map((type) => ({
                label: type.label,
                value: type.value,
              }))}
            />
          </div>
          {allowanceType && (
            <div className={styles.allowance}>
              <p
                className={styles.allowanceType}
              >{`${allowanceLabel.label}:`}</p>
              {Allowance(allowanceType)}
            </div>
          )}
          {allowanceType && (
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Add Rate (per hour)</p>
                <sup>*</sup>
              </div>
              <input
                type="number"
                className={styles.input}
                placeholder="Enter amount..."
                value={rate}
                onChange={handleRateChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn btnText="Save" onClick={handleAddNewAllowance} />
      </div>
    </div>
  );
};

export default AllowancesForm;
