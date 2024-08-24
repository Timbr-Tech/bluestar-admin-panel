/* eslint-disable */
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { Select } from "antd";
import { useState, useMemo } from "react";
import { ALLOWANCES_TYPES, Allowance } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

const AllowancesForm = () => {
  const [allowanceType, setAllowanceType] = useState<string>("");

  const handleAllowanceType = (value: string) => {
    setAllowanceType(value);
  };

  const allowanceLabel = useMemo(() => {
    return ALLOWANCES_TYPES.filter((type) => type.value === allowanceType)[0];
  }, [allowanceType]);

  return (
    <div className={styles.formContainer}>
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
                defaultValue={500}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default AllowancesForm;
