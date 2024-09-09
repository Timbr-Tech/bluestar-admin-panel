/* eslint-disable */
import { Select, Upload, message, notification, Switch } from "antd";
import { useState } from "react";
import type { UploadProps } from "antd";
import { useAppDispatch } from "../../../hooks/store";
import { addNewVehicle } from "../../../redux/slices/databaseSlice";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { FuelType } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";

interface IVehicleForm {
  handleCloseSidePanel: () => void;
}
type NotificationType = "success" | "info" | "warning" | "error";

const VehicleForm = ({ handleCloseSidePanel }: IVehicleForm) => {
  const { Dragger } = Upload;
  const [vehiclePayload, setVehiclePayload] = useState({
    modelName: "",
    vehicleNumber: "",
    fuelType: "",
    vehicleGroupId: "", //Always add an ID from the vehicle-group table, the data for vehicle group is fetched from that
    driverId: "", //Driver ID from driver collection
    fastTagId: "",
    registration: {
      ownerName: "Dogra",
      date: "2024-09-02T10:30:00.000Z",
      registrationDocument: {
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
        fileType: "application/pdf",
        fileSize: 201818,
      },
    },
    insurance: {
      companyName: "Laxmi chit fund",
      policyNumber: "420",
      issueDate: "2024-09-02T10:30:00.000Z",
      dueDate: "2024-09-02T10:30:00.000Z",
      premiumAmount: 6000,
      coverAmount: 1000000000,
      insuranceDocument: {
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
        fileType: "application/pdf",
        fileSize: 201818,
      },
    },
    rto: {
      ownerName: "Dogra",
      date: "2024-09-02T10:30:00.000Z",
      registrationDocument: {
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
        fileType: "application/pdf",
        fileSize: 201818,
      },
    },
    parts: {
      chasisNumber: "696969",
      engineNumber: "420420",
    },
    expiryDate: "2024-09-02T10:30:00.000Z",
    vehicleDocuments: [
      {
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
        fileType: "application/pdf",
        fileSize: 201818,
      },
    ],
    notes: "Hello world",
    loan: {
      isActive: true,
      emiAmount: 6000,
      startDate: "2024-09-02T10:30:00.000Z",
      endDate: "2024-09-02T10:30:00.000Z",
      bankName: "NM United Bank",
      emiDate: "2024-09-02T10:30:00.000Z",
      loanDocument: {
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/bluestar-970ae.appspot.com/o/1725113067505-ArunavaModakCV2024-v2.pdf?alt=media",
        fileType: "application/pdf",
        fileSize: 201818,
      },
    },
  });
  const [api, contextHolder] = notification.useNotification();
  const [hasLoan, setHasLoan] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChange = (checked: boolean) => {
    setHasLoan(checked);
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Vehicle added",
      description: "Vehicle added to the database",
    });
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

  return (
    <div className={styles.formContainer}>
      {contextHolder}
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
            <div className={styles.headerText}>
              Registration
              <sup>*</sup>
            </div>
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
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              Insurance
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Company Name</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter company name..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Policy Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter policy number..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Issue Date</p>
              </div>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                className={styles.input}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Due Date</p>
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className={styles.input}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Premium Amount</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter premium amount..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Cover Amount</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter cover amount..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Insurance Document</p>
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
                  JPG, PNG, DOC or PDF (max. 10MB)
                </p>
              </Dragger>
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>
              RTO
              <sup>*</sup>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Owner Name</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter owner name..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Registration Date</p>
              </div>
              <input
                type="date"
                id="registrationDate"
                name="registrationDate"
                className={styles.input}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Registration Documents</p>
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
                  JPG, PNG, DOC or PDF (max. 10MB)
                </p>
              </Dragger>
            </div>
          </div>
          <div className={styles.secondaryContainer}>
            <div className={styles.headerText}>Parts</div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Chassis Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter chassis number..."
                defaultValue={""}
              />
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.text}>
                <p>Engine Number</p>
              </div>
              <input
                className={styles.input}
                placeholder="Enter engine number..."
                defaultValue={""}
              />
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.text}>
              <p>Car expiry Date</p>
            </div>
            <input
              type="date"
              id="carExpiryDate"
              name="carExpiryDate"
              className={styles.input}
            />
          </div>

          <div className={styles.switchContainer}>
            <div className={styles.text}>Loan</div>
            <Switch onChange={onChange} checked={hasLoan} />
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
                JPG, PNG, DOC or PDF (max. 10MB)
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
        <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
        <PrimaryBtn
          btnText="Save"
          onClick={() => {
            openNotificationWithIcon("success");
            handleCloseSidePanel();
          }}
        />
      </div>
    </div>
  );
};

export default VehicleForm;
