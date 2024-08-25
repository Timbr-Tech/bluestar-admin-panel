/* eslint-disable */
import { Select, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { FuelType } from "../../../constants/database";

import styles from "../DutyTypeTable/index.module.scss";

const VehicleForm = () => {
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
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Vehicle</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Model Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter model name..."
              defaultValue={"John Doe"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Vehicle Number</p>
              <sup>*</sup>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter model name..."
              defaultValue={1000}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Fuel Type</p>
              <sup>*</sup>
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={FuelType.map((fuel) => ({
                label: fuel.label,
                value: fuel.value,
              }))}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Category - Vehicle Group</p>
              <sup>*</sup>
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={FuelType.map((fuel) => ({
                label: fuel.label,
                value: fuel.value,
              }))}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Assigned Driver</p>
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={FuelType.map((fuel) => ({
                label: fuel.label,
                value: fuel.value,
              }))}
            />
            <div className={styles.secondaryText}>
              {
                "If you don’t assign a driver then you’ll get an option to assign a driver for this vehicle during each booking"
              }
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>FASTag Number</p>
              <sup>*</sup>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter model name..."
              defaultValue={987654321}
            />
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>Registration</div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Owner Name</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter model name..."
                defaultValue={"John Doe"}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Registration Date</p>
              </div>
              <input type="date" id="dob" name="dob" className={styles.input} />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Registration Document</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
