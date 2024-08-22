/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

const VehicleGroupForm = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <div className={styles.header}>Vehicle Group</div>
        <div className={styles.primaryText}>Redesign of untitledui.com</div>
      </div>
      <div className={styles.form}>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Name</p>
            <sup>*</sup>
          </div>
          <input
            className={styles.input}
            placeholder="Enter Vehicle Group"
            defaultValue={"Toyota Innova"}
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Description</p>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Enter a description..."
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Seating Capacity (excluding driver)</p>
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter value ..."
            defaultValue={4}
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Luggage count</p>
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter value ..."
            defaultValue={2}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default VehicleGroupForm;
