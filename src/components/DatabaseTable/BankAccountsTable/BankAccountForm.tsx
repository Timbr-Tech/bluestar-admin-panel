/* eslint-disable */
import { notification } from "antd";
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

interface IBankAccountForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const BankAccountForm = ({ handleCloseSidePanel }: IBankAccountForm) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Bank account added",
      description: "Bank account added to the database",
    });
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Bank Account</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Account Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter account name..."
              defaultValue={"John Doe"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Account Number</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter account number..."
              defaultValue={"BLUDRIVER01"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>IFSC Code</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter IFSC Code..."
              defaultValue={"987654321"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Bank Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Bank Name..."
              defaultValue={""}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Bank Branch</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Bank Branch..."
              defaultValue={""}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Notes</p>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Add a note...."
            />
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

export default BankAccountForm;
