/* eslint-disable */
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Upload,
  message,
  notification,
} from "antd";
import SecondaryBtn from "../../SecondaryBtn";
import PrimaryBtn from "../../PrimaryBtn";
import type { UploadProps } from "antd";
import { ReactComponent as UploadIcon } from "../../../icons/uploadCloud.svg";
import { ADDRESS_TYPE } from "../../../constants/database";
import styles from "../DutyTypeTable/index.module.scss";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import dayjs from "dayjs";
import {
  addBankAccount,
  addNewDriver,
  updateDriver,
  setViewContentDatabase,
} from "../../../redux/slices/databaseSlice";
import { ReactComponent as EditIcon } from "../../../icons/edit-icon.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { useEffect } from "react";
import { RootState } from "../../../types/store";

interface IDriverForm {
  handleCloseSidePanel: () => void;
}
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import CustomDatePicker from "../../Common/CustomDatePicker";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const convertIsoToDayjsObject = (isoString: string) => {
  console.log(isoString, "isoString");
  const dayjsObject = dayjs(isoString);

  console.log(dayjsObject.isValid(), "dayjsObject.isValid()");

  if (!dayjsObject.isValid()) {
    throw new Error("Invalid ISO string");
  }

  return dayjsObject;
};
type NotificationType = "success" | "info" | "warning" | "error";

const DriversForm = ({ handleCloseSidePanel }: IDriverForm) => {
  const { Dragger } = Upload;
  const [api, contextHolder] = notification.useNotification();
  const { selectedDriver, viewContentDatabase } = useAppSelector(
    (state: RootState) => state.database
  );
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
      message: "Driver added",
      description: "Driver added to the database",
    });
  };
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const onSubmit = (values: any) => {
    if (
      selectedDriver?.data?._id &&
      Object.keys(selectedDriver?.data).length > 0
    ) {
      dispatch(
        updateDriver({
          payload: values,
          id: selectedDriver?.data._id,
        })
      );
      handleCloseSidePanel();
    } else {
      dispatch(addNewDriver(values));
      handleCloseSidePanel();
    }
  };
  useEffect(() => {
    if (selectedDriver.data && Object.keys(selectedDriver?.data).length > 0) {
      const valuesToMaped = selectedDriver?.data;
      console.log("valuesToMaped", valuesToMaped);
      form.setFieldsValue({
        address: {
          type: valuesToMaped.address.type,
          fullAddress: valuesToMaped.address.fullAddress,
        },
        _id: valuesToMaped._id,
        customDriverId: valuesToMaped.customDriverId,
        name: valuesToMaped.name,
        phoneNumber: valuesToMaped.phoneNumber,
        dob: valuesToMaped.dob,
        ids: {
          pan: valuesToMaped.ids.pan,
          aadhar: valuesToMaped.ids.aadhar,
          drivingLiscence: valuesToMaped.ids.drivingLiscence,
        },
        monthlySalary: valuesToMaped.monthlySalary,
        dailySalary: valuesToMaped.dailySalary,
        timing: {
          start: convertIsoToDayjsObject(valuesToMaped?.timing?.start),
          end: convertIsoToDayjsObject(valuesToMaped?.timing?.end),
        },
        offDay: valuesToMaped.offDay,
        notes: valuesToMaped.notes,
      });
    }
  }, [selectedDriver]);
  return (
    <div className={styles.formContainer}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>
            {Object.keys(selectedDriver).length
              ? viewContentDatabase
                ? "Driver"
                : "Edit Driver"
              : "New Driver"}
          </div>
          <div className={styles.primaryText}>
            {Object.keys(selectedDriver).length
              ? viewContentDatabase
                ? "View driver details"
                : "Update or modify driver details"
              : "Add details of new driver"}
          </div>
        </div>
        <Form
          onFinishFailed={(err) => {
            //for errors
            console.log("err", err);
          }}
          onFinish={(values) => {
            // passed validation
            const valuesToSubmit = {
              ...values,
              monthlySalary: Number(values?.monthlySalary),
              dailySalary: Number(values?.dailySalary),
              phoneNumber: values?.phoneNumber.startsWith("+91")
                ? values?.phoneNumber
                : `+91${values?.phoneNumber}`,
              // timing: {
              //   start: parseTime(values.timing.start),
              //   end: parseTime(values.timing.end),
              // },
            };
            console.log("values", valuesToSubmit);
            onSubmit(valuesToSubmit);
          }}
          requiredMark={CustomizeRequiredMark}
          layout="vertical"
          form={form}
          disabled={viewContentDatabase}
          className={styles.form}
        >
          <div className={styles.typeContainer}>
            <Form.Item
              name="customDriverId"
              id="customDriverId"
              label="Driver ID"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input placeholder="Enter Driver ID..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              id="name"
              label="Name"
            >
              <Input placeholder="Enter Name..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^(\+91)?[6-9][0-9]{9}$/,
                  message: "Please enter a valid Indian phone number",
                },
              ]}
              name="phoneNumber"
              id="phoneNumber"
              label="Phone Number"
              getValueProps={(value) => ({
                value: value ? value.replace(/^\+91/, "") : "",
              })}
              // Ensure +91 is stripped when user enters phone number
              getValueFromEvent={(e) => {
                const inputValue = e.target.value;
                return inputValue.replace(/^\+91\s?/, ""); // Remove +91 if present
              }}
            >
              <Input prefix="+91" type="text" placeholder="Enter phone..." />
            </Form.Item>
          </div>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: false,
                },
              ]}
              name="dob"
              id="dob"
              label="Date of birth"
            >
              <CustomDatePicker />
            </Form.Item>
          </div>
          {/* ids */}
          <Form.Item
            name="ids"
            id="ids"
            label="Unique IDs"
            className={styles.secondaryContainer}
          >
            <Input.Group className={"custom-input-group"}>
              <div className={styles.typeContainer}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name={["ids", "pan"]}
                  label="PAN Number"
                >
                  <Input placeholder="Enter PAN..." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name={["ids", "aadhar"]}
                  label="Aadhaar Number"
                >
                  <Input placeholder="Enter aadhar " />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name={["ids", "drivingLiscence"]}
                  label="Driver License"
                >
                  <Input placeholder="Enter driving  license" />
                </Form.Item>
              </div>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="address"
            id="address"
            label="Address"
            className={styles.secondaryContainer}
          >
            <Input.Group className={"custom-input-group"}>
              <div className={styles.typeContainer}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name={["address", "type"]}
                  label="Type"
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select One"
                    dropdownRender={(menu) => <>{menu}</>}
                    options={ADDRESS_TYPE.map((address) => ({
                      label: address.label,
                      value: address.value,
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
                  name={["address", "fullAddress"]}
                  label="Full Address"
                >
                  <Input.TextArea
                    className={styles.textarea}
                    placeholder="Enter address..."
                  />
                </Form.Item>
              </div>
            </Input.Group>
          </Form.Item>
          <div className={styles.typeContainer}>
            <Form.Item
              name="monthlySalary"
              id="monthlySalary"
              label="Salary per month"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter salary per month..."
                min={0}
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
              name="dailySalary"
              id="dailySalary"
              label="Daily Wages"
            >
              <Input type="number" placeholder="Enter daily wage..." min={0} />
            </Form.Item>
          </div>
          <Form.Item id="timing" name="timing">
            <Input.Group className={styles.twoSections}>
              <div className={styles.section}>
                <Form.Item
                  rules={[
                    {
                      required: false,
                      message: "Please select an start time",
                    },
                  ]}
                  name={["timing", "start"]}
                  label="Shift Start Time"
                  getValueProps={(value) => {
                    if (!value) return { value: undefined };
                    try {
                      const timeObj = dayjs(value, "h:mm A", true);
                      return { value: timeObj.isValid() ? timeObj : undefined };
                    } catch (error) {
                      console.error("Error parsing time:", error);
                      return { value: undefined };
                    }
                  }}
                  // getValueFromEvent={(time) => {
                  //   if (!time) return undefined;
                  //   try {
                  //     return time.format("h:mm A");
                  //   } catch (error) {
                  //     console.error("Error formatting time:", error);
                  //     return undefined;
                  //   }
                  // }}
                  getValueFromEvent={(time) => {
                    if (!time) return undefined;

                    // Create a new Day.js object based on the selected time
                    const selectedTime = dayjs(time);

                    // Combine with today's date to get an ISO format
                    const isoDate = dayjs()
                      .date(selectedTime.date())
                      .month(selectedTime.month())
                      .year(selectedTime.year())
                      .hour(selectedTime.hour())
                      .minute(selectedTime.minute())
                      .second(0)
                      .millisecond(0);

                    return isoDate?.toISOString();
                  }}
                >
                  <TimePicker
                    style={{
                      width: "100%",
                    }}
                    use12Hours
                    format="h:mm A"
                  />
                </Form.Item>
              </div>
              <div className={styles.section}>
                <Form.Item
                  rules={[
                    {
                      required: false,
                      message: "Please select an end time",
                    },
                  ]}
                  name={["timing", "end"]}
                  label="Shift End Time"
                  getValueProps={(value) => {
                    if (!value) return { value: undefined };
                    try {
                      const timeObj = dayjs(value, "h:mm A", true);
                      return { value: timeObj.isValid() ? timeObj : undefined };
                    } catch (error) {
                      console.error("Error parsing time:", error);
                      return { value: undefined };
                    }
                  }}
                  // getValueFromEvent={(time) => {
                  //   if (!time) return undefined;
                  //   try {
                  //     return time.format("h:mm A");
                  //   } catch (error) {
                  //     console.error("Error formatting time:", error);
                  //     return undefined;
                  //   }
                  // }}
                  getValueFromEvent={(time) => {
                    if (!time) return undefined;

                    // Create a new Day.js object based on the selected time
                    const selectedTime = dayjs(time);

                    // Combine with today's date to get an ISO format
                    const isoDate = dayjs()
                      .date(selectedTime.date())
                      .month(selectedTime.month())
                      .year(selectedTime.year())
                      .hour(selectedTime.hour())
                      .minute(selectedTime.minute())
                      .second(0)
                      .millisecond(0);

                    return isoDate?.toISOString();
                  }}
                >
                  <TimePicker
                    style={{
                      width: "100%",
                    }}
                    use12Hours
                    format="h:mm A"
                  />
                </Form.Item>
              </div>
              <div className={styles.totalText}>{"Total working hour: 8"}</div>
            </Input.Group>
          </Form.Item>
          <div className={styles.typeContainer}>
            <Form.Item
              rules={[
                {
                  required: false,
                },
              ]}
              name="offDay"
              id="offDay"
              label="Off Day"
            >
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
            <Form.Item label="Notes" id="notes" name="notes">
              <Input.TextArea
                className={styles.textarea}
                placeholder="Add a note...."
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      {viewContentDatabase ? (
        <div className={styles.bottomContainer}>
          <PrimaryBtn
            btnText={"Edit"}
            onClick={() => {
              dispatch(setViewContentDatabase(false));
            }}
            LeadingIcon={EditIcon}
          />
        </div>
      ) : (
        <div className={styles.bottomContainer}>
          <SecondaryBtn btnText="Cancel" onClick={handleCloseSidePanel} />
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              form.submit();
            }}
            className="primary-btn"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default DriversForm;
