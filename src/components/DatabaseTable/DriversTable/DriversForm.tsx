/* eslint-disable */
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { Select } from "antd";
import { ADDRESS_TYPE } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

const DriversForm = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Driver</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Driver ID</p>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Driver ID..."
              defaultValue={"BLUDRIVER01"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Name..."
              defaultValue={"John Doe"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Phone Number</p>
              <sup>*</sup>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter Name..."
              defaultValue={"987654321"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Date of Birth</p>
            </div>
            <input type="date" id="dob" name="dob" className={styles.input} />
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              <p>Unique IDs</p>
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>PAN Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter Name..."
                defaultValue={"John Doe"}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Aadhaar Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter Aadhaar Number..."
                defaultValue={"283363222012"}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Driver License</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter driver license..."
                defaultValue={"283363222012"}
              />
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              <p>Address</p>
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Type</p>
              </div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                dropdownRender={(menu) => <>{menu}</>}
                options={ADDRESS_TYPE.map((address) => ({
                  label: address.label,
                  value: address.value,
                }))}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Address</p>
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Enter address..."
              />
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Salary per month</p>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter driver license..."
              defaultValue={10000}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Daily Wages</p>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter daily wage..."
              defaultValue={10000}
            />
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

export default DriversForm;
