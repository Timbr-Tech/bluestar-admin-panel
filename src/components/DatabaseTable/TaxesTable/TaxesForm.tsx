/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import { notification } from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

interface ITaxesForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const TaxesForm = ({ handleCloseSidePanel }: ITaxesForm) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Tax type added",
      description: "Tax type added to the database",
    });
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
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
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn
          btnText="Save"
          onClick={() => {
            handleCloseSidePanel();
            openNotificationWithIcon("success");
          }}
        />
      </div>
    </div>
  );
};

export default TaxesForm;
