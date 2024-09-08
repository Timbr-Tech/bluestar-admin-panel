/* eslint-disable */
import { Select, message, Upload, notification } from "antd";
import type { UploadProps } from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { useAppDispatch } from "../../../hooks/store";
import { addNewCustomer } from "../../../redux/slices/databaseSlice";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { STATES, CUSTOMER_TAX_TYPES } from "../../../constants/database";
import { useState } from "react";
import styles from "../DutyTypeTable/index.module.scss";

interface ICustomerForm {
  handleCloseSidePanel: () => void;
}

type NotificationType = "success" | "info" | "warning" | "error";

const CustomerForm = ({ handleCloseSidePanel }: ICustomerForm) => {
  const dispatch = useAppDispatch();
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

  const onChange = (e: { target: { name: string; value: any } }) => {
    setCustomerPayload({
      ...customerPaylod,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = () => {
    dispatch(addNewCustomer(customerPaylod));
    openNotificationWithIcon("success");
    handleCloseSidePanel();
  };

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Customer</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Customer Code</p>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Customer code..."
              value={customerPaylod.customerCode}
              onChange={onChange}
              name="customerCode"
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter name..."
              value={customerPaylod.name}
              onChange={onChange}
              name="name"
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Address</p>
              <sup>*</sup>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Enter address..."
              value={customerPaylod.address}
              onChange={onChange}
              name="address"
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Pincode</p>
            </div>
            <input
              className={styles.input}
              placeholder="Enter pincode..."
              value={customerPaylod.pinCode}
              onChange={onChange}
              name="pinCode"
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>State</p>
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              onChange={handleSelectChange}
              options={STATES.map((state) => ({
                label: state.label,
                value: state.value,
              }))}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Phone Number</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter phone number..."
              defaultValue={""}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Email Address</p>
            </div>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Enter email address..."
              value={customerPaylod.email}
              onChange={onChange}
            />
          </div>
          <div className={styles.customerTaxDetails}>
            <div className={styles.customerHeader}>Customer Tax Details</div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Type</p>
              </div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                onChange={handleTaxesSelect}
                dropdownRender={(menu) => <>{menu}</>}
                options={CUSTOMER_TAX_TYPES.map((state) => ({
                  label: state.label,
                  value: state.value,
                }))}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>GSTIN Number</p>
              </div>
              <input
                className={styles.input}
                name={"gstNumber"}
                placeholder="Enter GSTIN ..."
                value={customerPaylod.taxDetails.gstNumber}
                onChange={onChangeTaxDetails}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Billing Name</p>
              </div>
              <input
                className={styles.input}
                name={"billingName"}
                placeholder="Enter Billing Name ..."
                value={customerPaylod.taxDetails.billingName}
                onChange={onChangeTaxDetails}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Billing Address</p>
              </div>
              <textarea
                className={styles.textarea}
                name="billingAddress"
                placeholder="Enter address..."
                value={customerPaylod.taxDetails.billingAddress}
                onChange={onChangeTaxDetails}
              />
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
            <div className={styles.text}>
              <p>Default discount %</p>
            </div>
            <input
              type="number"
              className={styles.input}
              name="defaultDiscount"
              placeholder="Enter default discount..."
              value={customerPaylod.defaultDiscount}
              onChange={onChange}
            />
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
            <textarea
              className={styles.textarea}
              name="notes"
              placeholder="Add a note...."
              value={customerPaylod.notes}
              onChange={onChange}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="auto"
              name="auto"
              value="auto"
              onChange={handleCheckbox}
            />
            <label> Auto create invoice when duty is completed</label>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn btnText="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CustomerForm;
