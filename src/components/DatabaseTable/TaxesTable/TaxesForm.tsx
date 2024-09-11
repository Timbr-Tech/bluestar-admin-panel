/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { addNewTax } from "../../../redux/slices/databaseSlice";
import { notification } from "antd";
import { useState } from "react";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

interface ITaxesForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const TaxesForm = ({ handleCloseSidePanel }: ITaxesForm) => {
  const [api, contextHolder] = notification.useNotification();
  const [taxPayload, setTaxPayload] = useState({
    name: "",
    percentage: "",
    notes: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const value = e.target.value;
    if (e.target.name === "percentage") {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value)) {
        setTaxPayload({ ...taxPayload, percentage: value });
      }
    } else setTaxPayload({ ...taxPayload, [e.target.name]: value });
  };

  const handleSave = () => {
    dispatch(
      addNewTax({
        ...taxPayload,
        percentage: parseFloat(taxPayload.percentage),
      })
    );
    handleCloseSidePanel();
    openNotificationWithIcon("success");
  };

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
              name="name"
              value={taxPayload.name}
              onChange={handleChange}
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
              name="percentage"
              value={taxPayload.percentage}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Notes</p>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Add notes...."
              name="notes"
              value={taxPayload.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn btnText="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default TaxesForm;
