/* eslint-disable */
import { Select, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { DUTY_TYPES_TYPE } from "../../../constants/database";
import { ReactComponent as HelpCircle } from "../../../icons/help-circle.svg";
import { useState } from "react";
import styles from "./index.module.scss";

const DutyTypeForm = () => {
  const [items, setItems] = useState(DUTY_TYPES_TYPE);
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
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
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default DutyTypeForm;
