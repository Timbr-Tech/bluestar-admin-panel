/* eslint-disable */
import { Form, Input, notification } from "antd";
import { addBankAccount } from "../../../redux/slices/databaseSlice";
import { useAppDispatch } from "../../../hooks/store";
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";

interface IBankAccountForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const BankAccountForm = ({ handleCloseSidePanel }: IBankAccountForm) => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Bank account added",
      description: "Bank account added to the database",
    });
  };

  const onSubmit = (values: any) => {
    // openNotificationWithIcon("success");
    // handleCloseSidePanel();
    dispatch(addBankAccount(values));
  };
  const [form] = Form.useForm();

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Bank Account</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <Form
          onFinishFailed={() => {
            //for errors
          }}
          onFinish={(values) => {
            // passed validation

            const data = {
              ...values,
              accountNumber: Number(values.accountNumber),
            };
            onSubmit(data);
          }}
          requiredMark={CustomizeRequiredMark}
          layout="vertical"
          form={form}
          className={styles.form}
        >
          <div>
            <div className={styles.typeContainer}>
              <Form.Item
                label="Account Name"
                id="accountName"
                name="accountName"
                rules={[
                  {
                    required: true,
                    min: 3,
                  },
                ]}
              >
                <Input placeholder="Enter account name..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                label="Account Number"
                id="accountNumber"
                name="accountNumber"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[0-9]{4,17}$/),
                    message: "Wrong format!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter account number..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="IFSC Code"
                id="ifsc"
                name="ifsc"
              >
                <Input placeholder="Enter IFSC Code..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Bank Name"
                id="bankName"
                name="bankName"
              >
                <Input placeholder="Enter Bank Name..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Bank Branch"
                id="branchName"
                name="branchName"
              >
                <Input placeholder="Enter Bank Branch..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item label="Notes" id="notes" name="notes">
                <Input.TextArea
                  className={styles.textarea}
                  placeholder="Add a note...."
                />
              </Form.Item>
            </div>
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
          // onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default BankAccountForm;
