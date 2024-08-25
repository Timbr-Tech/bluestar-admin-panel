/* eslint-disable */
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { Select, TimePicker, Upload, message } from "antd";
import type { UploadProps } from "antd";
import type { Dayjs } from "dayjs";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { useState } from "react";
import { ADDRESS_TYPE } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

const DriversForm = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
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

  const onChange = (time: Dayjs) => {
    setValue(time);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Driver</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <div className={styles.form}>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Driver ID</p>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Driver ID..."
              defaultValue={"BLUDRIVER01"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Name</p>
              <sup>*</sup>
            </div>
            <input
              className={styles.input}
              placeholder="Enter Name..."
              defaultValue={"John Doe"}
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
              placeholder="Enter Name..."
              defaultValue={"987654321"}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Date of Birth</p>
            </div>
            <input type="date" id="dob" name="dob" className={styles.input} />
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              <p>Unique IDs</p>
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>PAN Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter Name..."
                defaultValue={"John Doe"}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Aadhaar Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter Aadhaar Number..."
                defaultValue={"283363222012"}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Driver License</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter driver license..."
                defaultValue={"283363222012"}
              />
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              <p>Address</p>
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Type</p>
              </div>
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                dropdownRender={(menu) => <>{menu}</>}
                options={ADDRESS_TYPE.map((address) => ({
                  label: address.label,
                  value: address.value,
                }))}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Address</p>
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Enter address..."
              />
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Salary per month</p>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter driver license..."
              defaultValue={10000}
            />
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Daily Wages</p>
            </div>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter daily wage..."
              defaultValue={10000}
            />
          </div>
          <div className={styles.twoSections}>
            <div className={styles.section}>
              <div className={styles.timeText}>Shift Start Time</div>
              <TimePicker value={value} onChange={onChange} />
            </div>
            <div className={styles.section}>
              <div className={styles.timeText}>Shift End Time</div>
              <TimePicker value={value} onChange={onChange} />
            </div>
            <div className={styles.totalText}>{"Total working hour: 8"}</div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Off Day</p>
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select One"
              dropdownRender={(menu) => <>{menu}</>}
              options={[
                { value: "sat", label: "Saturday" },
                { value: "sun", label: "Sunday" },
              ].map((day) => ({
                label: day.label,
                value: day.value,
              }))}
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
              placeholder="Add a note...."
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SecondaryBtn btnText="Cancel" onClick={() => {}} />
        <PrimaryBtn btnText="Save" onClick={() => {}} />
      </div>
    </div>
  );
};

export default DriversForm;
