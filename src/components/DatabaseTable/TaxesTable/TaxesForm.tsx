/* eslint-disable */
import styles from "../DutyTypeTable/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { Form, Input, notification, Spin, Button } from "antd";
import { useState, useEffect } from "react";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import { updateTax, addNewTax } from "../../../apis/database";

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
  const { selectedTax, taxesStates, updateTaxesState } = useAppSelector(
    (state) => state.database
  );

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
    if (Object.keys(selectedTax).length) {
      dispatch(
        updateTax({ payload: valuesToSend, id: selectedTax?.data?._id })
      );
    } else {
      dispatch(addNewTax(valuesToSend));
    }
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Tax type added",
      description: "Tax type added to the database",
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(selectedTax).length) {
      form.setFieldsValue({
        name: selectedTax?.data?.name,
        percentage: selectedTax?.data?.percentage,
        notes: selectedTax?.data?.notes,
      });
    }
  }, [selectedTax]);

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      {taxesStates.loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>
            {Object.keys(selectedTax)?.length ? "Tax Type" : "New Tax Type"}
          </div>
          <div className={styles.primaryText}>
            {Object.keys(selectedTax)?.length
              ? "View tax details"
              : "Add new tax details"}
          </div>
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
              <Input
                type="number"
                min={0}
                max={100}
                className={styles.input}
                placeholder="Enter..."
              />
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
        <Button
          type="primary"
          htmlType="submit"
          loading={taxesStates?.loading || updateTaxesState?.loading}
          onClick={() => {
            form.submit();
          }}
          className="primary-btn"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaxesForm;
