/* eslint-disable */
import { notification } from "antd";
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

type NotificationType = "success" | "info" | "warning" | "error";

interface IVehicleGroupForm {
  handleCloseSidePanel: () => void;
}

const VehicleGroupForm = ({ handleCloseSidePanel }: IVehicleGroupForm) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Vehicle group added",
      description: "Vehicle group added to the database",
    });
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
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

export default VehicleGroupForm;
