/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { addNewTax } from "../../../redux/slices/databaseSlice";
import { Form, Input, notification } from "antd";
import { useState } from "react";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";

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

  const handleSave = (valuesToSend: any) => {
    dispatch(addNewTax(valuesToSend));
    // handleCloseSidePanel();
    // openNotificationWithIcon("success");
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Tax type added",
      description: "Tax type added to the database",
    });
  };
  const [form] = Form.useForm();

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Tax Type</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <Form
          requiredMark={CustomizeRequiredMark}
          layout="vertical"
          onFinish={(values) => {
            const valuesToSend = {
              ...values,
              percentage: parseFloat(values.percentage),
            };
            console.log({ valuesToSend });
            handleSave(valuesToSend);
          }}
          form={form}
          className={styles.form}
        >
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              label="Name"
            >
              <Input className={styles.input} placeholder="Enter..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="percentage"
              label="Percentage"
            >
              <Input className={styles.input} placeholder="Enter..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="notes"
              label="Notes"
            >
              <Input.TextArea
                className={styles.textarea}
                placeholder="Add notes...."
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn
          btnText="Save"
          onClick={() => {
            form.submit();
          }}
        />
      </div>
    </div>
  );
};

export default TaxesForm;
