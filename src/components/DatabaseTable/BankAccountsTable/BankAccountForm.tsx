/* eslint-disable */
import { notification } from "antd";
import { addBankAccount } from "../../../redux/slices/databaseSlice";
import { useAppDispatch } from "../../../hooks/store";
import styles from "../DutyTypeTable/index.module.scss";
import { useState } from "react";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";

interface IBankAccountForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const BankAccountForm = ({ handleCloseSidePanel }: IBankAccountForm) => {
  const [api, contextHolder] = notification.useNotification();
  const [bankAccount, setBankAccount] = useState({
    accountName: "",
    accountNumber: 1234,
    bankName: "",
    ifsc: "",
    branchName: "",
    notes: "",
  });
  const dispatch = useAppDispatch()

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Bank account added",
      description: "Bank account added to the database",
    });
  };

  const handleChange = (e: { target: { value: any; name: any } }) => {
    const val = e.target.value;

    console.log(Number(val))

    if(e.target.name ==="accountNumber") {
      const regex = /^[0-9]*\.?[0-9]*$/
      if(regex.test(val)) {
        setBankAccount({ ...bankAccount, accountNumber: parseInt(val) });
      }
    } else {
      setBankAccount({ ...bankAccount, [e.target.name]: val });
    }

  };

  const onSubmit = () => {
    openNotificationWithIcon("success");
    handleCloseSidePanel();

    dispatch(addBankAccount(bankAccount))
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
              name="accountName"
              className={styles.input}
              placeholder="Enter account name..."
              value={bankAccount.accountName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Account Number</p>
              <sup>*</sup>
            </div>
            <input
              name="accountNumber"
              type="number"
              className={styles.input}
              placeholder="Enter account number..."
              value={bankAccount.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>IFSC Code</p>
              <sup>*</sup>
            </div>
            <input
              name="ifsc"
              className={styles.input}
              placeholder="Enter IFSC Code..."
              value={bankAccount.ifsc}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Bank Name</p>
              <sup>*</sup>
            </div>
            <input
              name="bankName"
              className={styles.input}
              placeholder="Enter Bank Name..."
              value={bankAccount.bankName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Bank Branch</p>
              <sup>*</sup>
            </div>
            <input
              name="branchName"
              className={styles.input}
              placeholder="Enter Bank Branch..."
              value={bankAccount.branchName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Notes</p>
            </div>
            <textarea
              name="notes"
              value={bankAccount.notes}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Add a note...."
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn btnText="Save" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default BankAccountForm;
