/* eslint-disable */
import {
  Select,
  message,
  Upload,
  notification,
  Form,
  Input,
  Checkbox,
  Spin,
  Button,
} from "antd";
import type { UploadProps } from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  addNewCustomer,
  updateCustomer,
} from "../../../redux/slices/databaseSlice";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { STATES, CUSTOMER_TAX_TYPES } from "../../../constants/database";
import { useState, useEffect } from "react";
import styles from "../DutyTypeTable/index.module.scss";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";

interface ICustomerForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const CustomerForm = ({ handleCloseSidePanel }: ICustomerForm) => {
  const dispatch = useAppDispatch();
  const { selectedCustomer, customersStates, updateCustomersStates } =
    useAppSelector((state) => state.database);
  const { Dragger } = Upload;
  const [api, contextHolder] = notification.useNotification();
  const [customerPaylod, setCustomerPayload] = useState({
    customerCode: "",
    name: "",
    address: "",
    pinCode: "",
    state: "",
    email: "",
    files: [],
    autoCreateInvoice: false,
    defaultDiscount: 0,
    notes: "",
    taxDetails: {
      type: "",
      billingName: "",
      taxId: "66cb7ee1287de64cae6c6967",
      gstNumber: "",
      billingAddress: "",
    },
  });

  // const onChange = (e: { target: { name: string; value: any } }) => {
  //   setCustomerPayload({
  //     ...customerPaylod,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSelectChange = (value: string) => {
    setCustomerPayload({ ...customerPaylod, state: value });
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Customer added",
      description: "Customer added to the database",
    });
  };

  const handleCheckbox = (e: any) => {
    setCustomerPayload({
      ...customerPaylod,
      autoCreateInvoice: e.target.checked,
    });
  };

  const handleTaxesSelect = (value: string) => {
    setCustomerPayload({
      ...customerPaylod,
      taxDetails: { ...customerPaylod.taxDetails, type: value },
    });
  };

  const onChangeTaxDetails = (e: any) => {
    setCustomerPayload({
      ...customerPaylod,
      taxDetails: {
        ...customerPaylod.taxDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (Object.keys(selectedCustomer).length) {
      dispatch(
        updateCustomer({ payload: values, id: selectedCustomer?.data?._id })
      );
    } else {
      dispatch(addNewCustomer(values));
    }
  };
  const [form] = Form.useForm();

  console.log(selectedCustomer, "selectedCustomer");

  useEffect(() => {
    if (Object.keys(selectedCustomer).length) {
      form.setFieldsValue({
        customerCode: selectedCustomer?.data?.customerCode,
        name: selectedCustomer?.data?.name,
        address: selectedCustomer?.data?.address,
        pinCode: selectedCustomer?.data?.pinCode,
        state: selectedCustomer?.data?.state,
        email: selectedCustomer?.data?.email,
        phoneNumber: selectedCustomer?.data?.phoneNumber,
        autoCreateInvoice: selectedCustomer?.data?.autoCreateInvoice,
        defaultDiscount: selectedCustomer?.data?.defaultDiscount,
        type: selectedCustomer?.data?.taxDetails?.type,
        billingName: selectedCustomer?.data?.taxDetails?.billingName,
        taxId: selectedCustomer?.data?.taxDetails?.taxId,
        gstNumber: selectedCustomer?.data?.taxDetails?.gstNumber,
        billingAddress: selectedCustomer?.data?.taxDetails?.billingAddress,
        files: selectedCustomer?.data?.files,
      });
    }
  }, [selectedCustomer]);

  return (
    <div className={styles.formContainer}>
      {customersStates.loading && (
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
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>
            {Object.keys(selectedCustomer).length ? "Customer" : "New Customer"}
          </div>
          <div className={styles.primaryText}>
            {Object.keys(selectedCustomer).length
              ? "View customer details"
              : "Add details of new customer"}
          </div>
        </div>
        <Form
          requiredMark={CustomizeRequiredMark}
          layout="vertical"
          form={form}
          className={styles.form}
          onFinish={(values) => {
            console.log("values", values);
            const valuesToSend = {
              customerCode: values.customerCode,
              name: values.name,
              address: values.address,
              pinCode: values.pinCode,
              state: values.state,
              email: values.email,
              phoneNumber: values.phoneNumber,
              autoCreateInvoice: values.autoCreateInvoice,
              defaultDiscount: values.defaultDiscount,
              taxDetails: {
                type: values.type,
                billingName: values.billingName,
                taxId: values.taxId,
                gstNumber: values.gstNumber,
                billingAddress: values.billingAddress,
              },
              files: [
                {
                  fileUrl:
                    "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
                  fileType: "application/pdf",
                  fileSize: 201818,
                },
              ],
            };
            handleSubmit(valuesToSend);
          }}
          onFinishFailed={(error) => {
            console.log(error, "Error");
          }}
        >
          <div className={styles.typeContainer}>
            <Form.Item
              label="Customer Code"
              rules={[
                {
                  required: false,
                },
              ]}
              name="customerCode"
              id="customerCode"
            >
              <Input placeholder="Enter Customer code..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              id="name"
            >
              <Input placeholder="Enter name..." name="name" />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Address"
              rules={[
                {
                  required: true,
                },
              ]}
              name="address"
              id="address"
            >
              <Input.TextArea
                className={styles.textarea}
                placeholder="Enter address..."
              />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Pin code"
              rules={[
                {
                  required: false,
                },
              ]}
              name="pinCode"
              id="pinCode"
            >
              <Input placeholder="Enter pin code..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="State"
              rules={[
                {
                  required: false,
                },
              ]}
              name="state"
              id="state"
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                dropdownRender={(menu) => <>{menu}</>}
                options={STATES.map((state) => ({
                  label: state.label,
                  value: state.value,
                }))}
              />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Phone Number"
              rules={[
                {
                  required: true,
                  // type: "number",
                },
              ]}
              name="phoneNumber"
              id="phoneNumber"
            >
              <Input placeholder="Enter phone number..." defaultValue={""} />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Email Address"
              rules={[
                {
                  required: false,
                },
              ]}
              name="email"
              id="email"
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter email address..."
              />
            </Form.Item>
          </div>
          <div className={styles.customerTaxDetails}>
            <div className={styles.customerHeader}>Customer Tax Details</div>
            <div className={styles.typeContainer}>
              <Form.Item
                label="Type"
                rules={[
                  {
                    required: false,
                  },
                ]}
                name="type"
                id="type"
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select One"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={CUSTOMER_TAX_TYPES.map((state) => ({
                    label: state.label,
                    value: state.value,
                  }))}
                />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="GSTIN Number"
                name="gstNumber"
                id="gstNumber"
              >
                <Input name={"gstNumber"} placeholder="Enter GSTIN ..." />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="Billing Name"
                name="billingName"
                id="billingName"
              >
                <Input
                  name={"billingName"}
                  placeholder="Enter Billing Name ..."
                />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              <Form.Item
                label="Billing Address"
                rules={[
                  {
                    required: false,
                  },
                ]}
                name="billingAddress"
                id="billingAddress"
              >
                <Input.TextArea
                  className={styles.textarea}
                  name="billingAddress"
                  placeholder="Enter address..."
                />
              </Form.Item>
            </div>
            {/* <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Taxes</p>
              </div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                dropdownRender={(menu) => <>{menu}</>}
                options={CUSTOMER_TAX_TYPES.map((state) => ({
                  label: state.label,
                  value: state.value,
                }))}
              />
            </div> */}
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Default discount %"
              name="defaultDiscount"
              id="defaultDiscount"
            >
              <Input
                type="number"
                name="defaultDiscount"
                placeholder="Enter default discount..."
              />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Attach Files</p>
            </div>
            <Dragger {...props} className="custom-upload">
              <div className={styles.uploadIconContainer}>
                <div className={styles.uploadIcon}>
                  <UploadIcon />
                </div>
              </div>
              <div className={styles.uploadText}>
                <p>Click to upload</p> or drag and drop
              </div>
              <p className={styles.uploadSubtext}>
                JPG, PNG, DOC or PDF (max. 20MB)
              </p>
            </Dragger>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Notes</p>
            </div>
            <Form.Item name="notes" id="notes">
              <Input.TextArea
                className={styles.textarea}
                name="notes"
                placeholder="Add a note...."
              />
            </Form.Item>
          </div>
          <div className={styles.checkboxContainer}>
            <Form.Item
              valuePropName="checked"
              name="autoCreateInvoice"
              id="autoCreateInvoice"
            >
              <Checkbox>Auto create invoice when duty is completed</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            form.submit();
          }}
          loading={customersStates?.loading || updateCustomersStates?.loading}
          className="primary-btn"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
