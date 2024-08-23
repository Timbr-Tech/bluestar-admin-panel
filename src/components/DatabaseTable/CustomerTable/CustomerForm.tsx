/* eslint-disable */
import { Select, message, Upload } from "antd";
import type { UploadProps } from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { STATES, CUSTOMER_TAX_TYPES } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

const CustomerForm = () => {
  const { Dragger } = Upload;

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

  return (
    <div className={styles.formContainer}>
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
            type="number"
            className={styles.input}
            placeholder="Enter Customer code..."
            defaultValue={"132245"}
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
            defaultValue={"John Doe"}
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
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Pincode</p>
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter pincode..."
            defaultValue={"132245"}
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
            type="number"
            className={styles.input}
            placeholder="Enter phone number..."
            defaultValue={"987654321"}
          />
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Email Address</p>
          </div>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter email address..."
            defaultValue={"olivia@untitledui.com"}
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
              placeholder="Enter GSTIN ..."
              defaultValue={"AXLPV7788X"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Billing Name</p>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Billing Name ..."
              defaultValue={"Business Name"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Billing Address</p>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Enter address..."
            />
          </div>
          <div className={styles.typeContainer}>
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
          </div>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.text}>
            <p>Default discount %</p>
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter default discount..."
            defaultValue={0}
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
          <textarea className={styles.textarea} placeholder="Add a note...." />
        </div>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="auto" name="auto" value="auto" />
          <label> Auto create invoice when duty is completed</label>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default CustomerForm;
