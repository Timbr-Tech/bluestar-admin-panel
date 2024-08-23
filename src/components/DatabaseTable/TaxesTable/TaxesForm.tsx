/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

const TaxesForm = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <div className={styles.header}>New Tax Type</div>
        <div className={styles.primaryText}>Redesign of untitledui.com</div>
      </div>
      <div className={styles.form}>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Tax Name</p>
            <sup>*</sup>
          </div>
          <input
            className={styles.input}
            placeholder="Enter..."
            defaultValue={"BLUDRIVER01"}
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Percentage %</p>
            <sup>*</sup>
          </div>
          <input
            className={styles.input}
            placeholder="Enter..."
            defaultValue={"John Doe"}
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Notes</p>
          </div>
          <textarea className={styles.textarea} placeholder="Add notes...." />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default TaxesForm;
