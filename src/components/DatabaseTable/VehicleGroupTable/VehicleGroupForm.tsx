/* eslint-disable */
import { notification } from "antd";
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/store";
import { addVehicleGroup } from "../../../redux/slices/databaseSlice";
import PrimaryBtn from "../../PrimaryBtn";

type NotificationType = "success" | "info" | "warning" | "error";

interface IVehicleGroupForm {
  handleCloseSidePanel: () => void;
}

const VehicleGroupForm = ({ handleCloseSidePanel }: IVehicleGroupForm) => {
  const [api, contextHolder] = notification.useNotification();
  const [vehicleGroup, setVehicleGroup] = useState({
    name: "",
    seatingCapacity: 0,
    description: "",
    luggageCapacity: 0,
  });
  const dispatch = useAppDispatch();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Vehicle group added",
      description: "Vehicle group added to the database",
    });
  };

  const handleVehicleGroupChange = (e: any) => {
    if (e.target.name === "name") {
      setVehicleGroup({ ...vehicleGroup, name: e.target.value });
    } else if (e.target.name === "seatingCapacity") {
      setVehicleGroup({
        ...vehicleGroup,
        seatingCapacity: Number(e.target.value),
      });
    } else if (e.target.name === "description") {
      setVehicleGroup({ ...vehicleGroup, description: e.target.value });
    } else if (e.target.name === "luggageCapacity") {
      setVehicleGroup({
        ...vehicleGroup,
        luggageCapacity: Number(e.target.value),
      });
    }
  };

  const handleSubmitForm = () => {
    dispatch(addVehicleGroup(vehicleGroup));
    openNotificationWithIcon("success");
    handleCloseSidePanel();
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
              name="name"
              placeholder="Enter Vehicle Group"
              value={vehicleGroup.name}
              onChange={handleVehicleGroupChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Description</p>
            </div>
            <textarea
              name="description"
              className={styles.textarea}
              placeholder="Enter a description..."
              value={vehicleGroup.description}
              onChange={handleVehicleGroupChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Seating Capacity (excluding driver)</p>
            </div>
            <input
              name="seatingCapacity"
              className={styles.input}
              placeholder="Enter value ..."
              value={vehicleGroup.seatingCapacity}
              onChange={handleVehicleGroupChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Luggage count</p>
            </div>
            <input
              name="luggageCapacity"
              className={styles.input}
              placeholder="Enter value ..."
              value={vehicleGroup.luggageCapacity}
              onChange={handleVehicleGroupChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn btnText="Save" onClick={handleSubmitForm} />
      </div>
    </div>
  );
};

export default VehicleGroupForm;
