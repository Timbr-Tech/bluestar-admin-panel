/* eslint-disable */
import {
  Select,
  Upload,
  message,
  notification,
  Switch,
  Form,
  Input,
  DatePicker,
  AutoComplete,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import type { UploadProps } from "antd";
import { useAppDispatch } from "../../../hooks/store";
import {
  addNewVehicle,
  getDrivers,
  getVehicleGroup,
} from "../../../redux/slices/databaseSlice";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { FuelType } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { RootState } from "../../../types/store";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import CustomDatePicker from "../../Common/CustomDatePicker";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
interface IVehicleForm {
  handleCloseSidePanel: () => void;
}
type NotificationType = "success" | "info" | "warning" | "error";

const VehicleForm = ({ handleCloseSidePanel }: IVehicleForm) => {
  const { Dragger } = Upload;

  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false); // Track checkbox value in state

  // Function to handle changes in form values
  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log("changedValues", changedValues);
    if (changedValues?.loan?.isActive !== undefined) {
      setIsActive(changedValues?.loan?.isActive);
    }
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

  const {
    driverOption: options,
    vehicleGroupSelectOption,
    selectedVehicle,
  } = useSelector((state: RootState) => state.database);

  const getPanelValue = (searchText: string) => {
    if (searchText) {
      dispatch(
        getDrivers({
          search: searchText,
        })
      );
    }
  };
  const getVehicleGroupValue = (searchText: string) => {
    if (searchText) {
      dispatch(
        getVehicleGroup({
          search: searchText,
        })
      );
    }
  };
  const [form] = Form.useForm();

  console.log("selectedVehicle", selectedVehicle);
  useEffect(() => {
    if (Object.keys(selectedVehicle).length) {
      const values = selectedVehicle;
      form.setFieldsValue(values);
      setIsActive(values?.loan?.isActive);
    }
  }, [selectedVehicle]);

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>New Vehicle</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <Form
          requiredMark={CustomizeRequiredMark}
          layout="vertical"
          form={form}
          onFinish={(Values) => {
            console.log(Values);
            if (Object.keys(selectedVehicle).length) {
              //
            } else {
              dispatch(addNewVehicle(Values));
            }
          }}
          initialValues={{
            loan: {
              isActive: isActive, // Your initial value for the switch
            },
          }}
          onValuesChange={handleValuesChange}
          className={styles.form}
        >
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label="Model Name"
              name="modelName"
              id="modelName"
            >
              <Input placeholder="Enter model name..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label="Vehicle Number"
              name="vehicleNumber"
              id="vehicleNumber"
            >
              <Input placeholder="Enter model name..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label="Fuel type"
              name="fuelType"
              id="fuelType"
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select One"
                dropdownRender={(menu) => <>{menu}</>}
                options={FuelType.map((fuel) => ({
                  label: fuel.label,
                  value: fuel.value,
                }))}
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
              label="Category - Vehicle Group"
              name="vehicleGroupId"
              id="vehicleGroupId"
            >
              <AutoComplete
                allowClear
                options={vehicleGroupSelectOption}
                onSearch={(text) => getVehicleGroupValue(text)}
                placeholder="Search drivers"
                fieldNames={{ label: "label", value: "value" }}
                notFoundContent={<div>No search result</div>}
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
              label="Assigned Driver"
              name="driverId"
              id="driverId"
            >
              <AutoComplete
                allowClear
                options={options}
                onSearch={(text) => getPanelValue(text)}
                placeholder="Search drivers"
                fieldNames={{ label: "label", value: "value" }}
                notFoundContent={<div>No search result</div>}
              />
            </Form.Item>
            <div className={styles.secondaryText}>
              "If you don’t assign a driver then you’ll get an option to assign
              a driver for this vehicle during each booking"
            </div>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label="FASTag Number"
              name="fastTagId"
              id="fastTagId"
            >
              <Input placeholder="Enter model name..." />
            </Form.Item>
          </div>
          {/* registration */}
          <div className={styles.secondaryContainer}>
            <Form.Item name="registration" label="Registration">
              <Input.Group>
                <Form.Item
                  label="Owner name"
                  name={["registration", "ownerName"]}
                  rules={[
                    { required: true, message: "Owner name is required" },
                  ]}
                >
                  <Input placeholder="Owner Name" />
                </Form.Item>
                <Form.Item label="Date" name={["registration", "date"]}>
                  <CustomDatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                  label="Document"
                  name={["registration", "registrationDocument"]}
                  // rules={[{ required: true, message: "File is required" }]}
                >
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
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </div>
          {/* Insurance */}
          <Form.Item
            className={styles.secondaryContainer}
            name="insurance"
            label="Insurance"
          >
            <Input.Group>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Company name"
                  name={["insurance", "companyName"]}
                  rules={[
                    { required: true, message: "Company name  is required" },
                  ]}
                >
                  <Input placeholder="Enter company name..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Policy Number"
                  name={["insurance", "policyNumber"]}
                  rules={[
                    { required: true, message: "Policy Number is required" },
                  ]}
                >
                  <Input placeholder="Enter policy number..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Issue Date"
                  name={["insurance", "issueDate"]}
                  rules={[
                    { required: true, message: "Issue Date is required" },
                  ]}
                >
                  <CustomDatePicker format="DD-MM-YYYY" />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Due Date"
                  name={["insurance", "dueDate"]}
                  rules={[{ required: true, message: "Due Date is required" }]}
                >
                  <CustomDatePicker format="DD-MM-YYYY" />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Premium Amount"
                  name={["insurance", "premiumAmount"]}
                  rules={[{ required: true, message: "Due Date is required" }]}
                >
                  <Input placeholder="Enter premium amount..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Cover Amount"
                  name={["insurance", "coverAmount"]}
                  rules={[
                    { required: true, message: "Cover amount is required" },
                  ]}
                >
                  <Input placeholder="Enter cover amount..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Insurance Document"
                  name={["insurance", "insuranceDocument"]}
                  rules={[
                    {
                      // required: true,
                      message: "Insurance Document is required",
                    },
                  ]}
                >
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
                </Form.Item>
              </div>
            </Input.Group>
          </Form.Item>
          {/* RTO */}
          <Form.Item
            className={styles.secondaryContainer}
            name="rto"
            label="RTO"
          >
            <Input.Group>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Owner name"
                  name={["rto", "ownerName"]}
                  rules={[
                    { required: true, message: "Owner name is required" },
                  ]}
                >
                  <Input placeholder="Enter owner name..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Registration Date"
                  name={["rto", "date"]}
                  rules={[{ required: true, message: "Date is required" }]}
                >
                  <CustomDatePicker format="DD-MM-YYYY" />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="RTO Document"
                  name={["rto", "rtoDocument"]}
                  rules={[
                    {
                      // required: true,
                      message: "RTO is required",
                    },
                  ]}
                >
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
                </Form.Item>
              </div>
            </Input.Group>
          </Form.Item>
          {/* parts */}
          <Form.Item
            className={styles.secondaryContainer}
            name="parts"
            label="parts"
          >
            <Input.Group>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Chasis number"
                  name={["parts", "chasisNumber"]}
                  rules={[
                    {
                      required: true,
                      message: "chassis number is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter chassis number..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Engine number"
                  name={["parts", "engineNumber"]}
                  rules={[
                    {
                      required: true,
                      message: "Engine  number is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter engine number..." />
                </Form.Item>
              </div>
            </Input.Group>
          </Form.Item>
          <div className={styles.typeContainer}>
            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
              getValueFromEvent={(date) => date?.toISOString()}
              rules={[
                {
                  required: true,
                  message: "Expiry date is required",
                },
              ]}
            >
              <CustomDatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </div>
          {/* TODO- LOAN */}

          <Form.Item name="loan" label="loan">
            <Input.Group className={styles.secondaryContainer}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.text}>Loan</div>
                <Form.Item
                  valuePropName="checked"
                  name={["loan", "isActive"]}
                  id="isActive"
                >
                  <Switch />
                </Form.Item>
              </div>

              {isActive && (
                <Fragment>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="Emi amount"
                      name={["loan", "emiAmount"]}
                      rules={[
                        {
                          required: true,
                          message: "EMI Amount is required",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter Emi amount" />
                    </Form.Item>
                  </div>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="Start Date"
                      name={["loan", "startDate"]}
                      rules={[
                        {
                          required: true,
                          message: "startDate is required",
                        },
                      ]}
                    >
                      <CustomDatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                  </div>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="End Date"
                      name={["loan", "endDate"]}
                      rules={[
                        {
                          required: true,
                          message: "endDate is required",
                        },
                      ]}
                    >
                      <CustomDatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                  </div>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="Bank Name"
                      name={["loan", "bankName"]}
                      rules={[
                        {
                          required: true,
                          message: "Bank name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Enter bank name" />
                    </Form.Item>
                  </div>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="EMI Date (Every month)"
                      name={["loan", "emiDate"]}
                      rules={[
                        {
                          required: true,
                          message: "EMI date is required",
                        },
                      ]}
                      // getValueProps={(value) => ({
                      //   value: value ? dayjs(value) : undefined,
                      // })}
                      // getValueFromEvent={(date) => date?.toISOString()}
                    >
                      {/* <DatePicker
                        format="DD" // Display format as day only
                        placeholder="Select a day"
                      /> */}
                      <CustomDatePicker format="DD" />
                    </Form.Item>
                  </div>
                  <div className={styles.typeContainer}>
                    <Form.Item
                      label="Loan Document"
                      name={["loan", "loanDocument"]}
                      rules={[
                        {
                          //  required: true,
                          message: "loan document is required",
                        },
                      ]}
                    >
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
                    </Form.Item>
                  </div>
                </Fragment>
              )}
            </Input.Group>
          </Form.Item>

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
            <Form.Item
              label="Notes"
              name="notes"
              id="notes"
              rules={[
                {
                  // required: true,
                  message: "notes is required",
                },
              ]}
            >
              <Input.TextArea
                className={styles.textarea}
                placeholder="Add a note...."
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
            // openNotificationWithIcon("success");
            // handleCloseSidePanel();
          }}
        />
      </div>
    </div>
  );
};

export default VehicleForm;
