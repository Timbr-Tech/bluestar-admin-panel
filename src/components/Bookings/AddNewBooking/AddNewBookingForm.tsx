/* eslint-disable */
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Form,
  Input,
  AutoComplete,
  Space,
  Card,
  Radio,
  Button,
  Select,
  Checkbox,
  Row,
  Col,
  TimePicker,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import CustomDatePicker from "../../Common/CustomDatePicker";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { RootState } from "../../../types/store";
import { addNewBooking } from "../../../apis/booking";
import {
  getAllDutyTypes,
  getCustomer,
  getVehicleGroup,
} from "../../../redux/slices/databaseSlice";

const { TextArea } = Input;
interface AddNewBookingForm {
  initialData?: any;
  isEditable?: boolean;
  // handleFormSubmit: (value?: any) => void;
  form: any;
}
const AddNewBookingForm = ({
  initialData,
  isEditable = true,
  // handleFormSubmit,
  form,
}: AddNewBookingForm) => {
  const { vehicleGroupSelectOption, dutyTypeOption, customersOption } =
    useAppSelector((state: RootState) => state.database);
  const dispatch = useAppDispatch();

  const getDutyTypeValue = (searchText: string) => {
    if (searchText) {
      dispatch(
        getAllDutyTypes({
          search: searchText,
        })
      );
    }
  };
  const getCustomerList = (searchText: string) => {
    if (searchText) {
      dispatch(
        getCustomer({
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
  const [useThisPassenger, setUseThisPassenger] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(initialData).length) {
      form.setFieldsValue({
        _id: initialData?._id,
        customBookingId: initialData?.customBookingId,
        customerId: initialData?.customerId,
        bookedBy: initialData?.bookedBy,
        passergers: initialData?.passergers,
        dutyTypeId: initialData?.dutyTypeId,
        assignAlternateVehicles: initialData?.assignAlternateVehicles,
        reportingAddress: initialData?.reportingAddress,
        dropAddress: initialData?.dropAddress,
        isAirportBooking: initialData?.isAirportBooking,
        // duration: initialData?.duration, // yaha fat raha h
        operatorNotes: initialData?.operatorNotes,
        driverNotes: initialData?.driverNotes,
        isUnconfirmed: initialData?.isUnconfirmed,
        isDeleted: initialData?.isDeleted,
        bookingStatus: initialData?.bookingStatus,
        address: initialData?.address,
      });
    }
  }, [initialData]);
  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      disabled={!isEditable}
      onFinishFailed={(errorInfo) => {
        console.log("Failed:", errorInfo);
      }}
      onFinish={(values) => {
        console.log(values);
        // handleFormSubmit(value);
        dispatch(addNewBooking(values));
      }}
      // initialValues={initialData}
      requiredMark={CustomizeRequiredMark}
      className={styles.form}
    >
      <Form.Item
        name="customBookingId"
        label="Custom booking Id"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"customerId"}
        rules={[{ required: true }]}
        label="Customer"
      >
        <AutoComplete
          placeholder="Select customer"
          allowClear
          options={customersOption}
          onSearch={(text) => getCustomerList(text)}
          fieldNames={{ label: "label", value: "value" }}
          notFoundContent={<div>No search result</div>}
        />
      </Form.Item>

      <Card className={styles.BookedByCardContainer}>
        <Form.Item
          name="bookedBy"
          id="bookedBy"
          label="Booked By"
          className={styles.secondaryContainer}
        >
          <Input.Group>
            <Form.Item
              name={["bookedBy", "name"]}
              label="Booked by name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["bookedBy", "phoneNumber"]}
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number." },
                {
                  pattern: /^(\+91)?[6-9][0-9]{9}$/,
                  message: "Please enter a valid Indian phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["bookedBy", "email"]}
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input type="email" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Radio
          value={useThisPassenger}
          checked={useThisPassenger}
          onClick={() => {
            if (!useThisPassenger) {
              const currentPassengers = form.getFieldValue("passergers") || [];
              const bookedBy = form.getFieldValue("bookedBy") || [];
              // Set the new passergers array with the new data
              form.setFieldsValue({
                passergers: [
                  {
                    name: bookedBy.name,
                    phoneNumber: bookedBy.phoneNumber,
                  },
                ],
              });
            }
            setUseThisPassenger(!useThisPassenger);
          }}
          style={{
            marginTop: "0.8rem",
          }}
        >
          Use this same details for passenger
        </Radio>
      </Card>
      {/*  passenger detail */}
      <Card className={styles.PassengerCardContainer}>
        <p>Passenger Details</p>
        <Form.List name="passergers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Card key={key} className={styles.PassengerCard}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    label="Passenger name"
                    rules={[{ required: true, message: "Please input name" }]}
                  >
                    <Input placeholder="Passenger name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "phoneNumber"]}
                    label="Passenger phone number"
                    rules={[
                      { required: true, message: "Please input phone number" },
                    ]}
                  >
                    <Input placeholder="Passenger phone number" />
                  </Form.Item>

                  {fields.length > 1 && (
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      className={styles.deletePassengerButton}
                    />
                  )}
                </Card>
              ))}

              <Form.Item>
                <Button
                  className={styles.addPassengerButton}
                  type="text"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Passenger
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
      <Form.Item
        name="dutyTypeId"
        rules={[{ required: true }]}
        label="Duty type"
      >
        <AutoComplete
          allowClear
          options={dutyTypeOption}
          onSearch={(text) => getDutyTypeValue(text)}
          placeholder="Select Duty type"
          fieldNames={{ label: "label", value: "value" }}
          notFoundContent={<div>No search result</div>}
        />
      </Form.Item>
      <Form.Item
        name="VehicleGroupId"
        id="VehicleGroupId"
        rules={[{ required: true }]}
        label="Vehicle Group"
      >
        <AutoComplete
          allowClear
          options={vehicleGroupSelectOption}
          onSearch={(text) => getVehicleGroupValue(text)}
          placeholder="Search drivers"
          fieldNames={{ label: "label", value: "value" }}
          notFoundContent={<div>No search result</div>}
        ></AutoComplete>
      </Form.Item>

      <Form.Item valuePropName="checked" name="assignAlternateVehicles">
        <Card
          style={{
            margin: "1rem 0rem",
          }}
        >
          <Checkbox>
            <p>Assign Alternate Vehicle Numbers for multiple duties per day </p>
            <p>
              Alternate vehicle numbers will only show on generated duty slips
            </p>
          </Checkbox>
        </Card>
      </Form.Item>

      <Space></Space>

      <Form.Item
        rules={[
          { required: true, message: "Please provide a Google Maps link!" },
          {
            pattern:
              /^(https:\/\/(www\.)?google\.(com|[a-z]{2})\/maps\/.+|https:\/\/maps\.app\.goo\.gl\/.+)/,
            message: "Please enter a valid Google Maps URL!",
          },
        ]}
        name="reportingAddress"
        label="Reporting Address"
      >
        <TextArea placeholder="Location (Google map link)"></TextArea>
      </Form.Item>
      <Form.Item
        name="dropAddress"
        rules={[
          { required: true, message: "Please provide a Google Maps link!" },
          {
            pattern:
              /^(https:\/\/(www\.)?google\.(com|[a-z]{2})\/maps\/.+|https:\/\/maps\.app\.goo\.gl\/.+)/,
            message: "Please enter a valid Google Maps URL!",
          },
        ]}
        label="Drop Address"
      >
        <TextArea placeholder="Location (Google map link)"></TextArea>
      </Form.Item>
      <Form.Item
        style={{
          margin: "1rem 0rem",
        }}
        label="Booking type"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select booking type",
            },
          ]}
          name="bookingType"
        >
          <Radio.Group className={styles.bookingType}>
            <Radio className={styles.item} value={"Local"}>
              <b>Local booking</b>
              <p>Local rates would apply</p>
            </Radio>
            <Radio className={styles.item} value={"Outstation"}>
              <b>Outstation booking</b>
              <p>Outstation rates would apply</p>
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form.Item>
      <Form.Item name="isAirportBooking" valuePropName="checked">
        <Checkbox>This is an airport booking</Checkbox>
      </Form.Item>

      <Card className={styles.durationDetailsCard}>
        <b>Duration Details </b>
        <Input.Group>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={["duration", "startTime"]}
                label="Start Date"
              >
                <CustomDatePicker
                  showHour={true}
                  showMinute={true}
                  showTime={true}
                  format="DD-MM-YYYY"
                  use12Hours
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={["duration", "endTime"]}
                label="End Date"
              >
                <CustomDatePicker
                  showHour={true}
                  showMinute={true}
                  showTime={true}
                  use12Hours
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item label="Reporting Time">
                <TimePicker
                  use12Hours
                  format="h:mm:ss A"
                  style={{
                    width: "100%",
                  }}
                  onChange={() => {}}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Est Drop Time">
                <TimePicker
                  use12Hours
                  format="h:mm:ss A"
                  style={{
                    width: "100%",
                  }}
                  onChange={() => {}}
                />
              </Form.Item>
            </Col> */}

            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={["duration", "startBefore"]}
                label="Start from garage before (in mins)"
              >
                <TimePicker
                  format="mm"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Card>
      <Card className={styles.pricingDetailsCard}>
        <div className={styles.pricingDetails}>
          <b>Pricing Details</b>
          <span>
            <SyncOutlined />
            Fetch from Contract
          </span>
        </div>
        <div>
          <Input.Group>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name={["pricingDetails", "baseRate"]}
                  label="Base Rate"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    min={0}
                    placeholder="Prefilled based on Duty Type"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["pricingDetails", "extraKmRate"]}
                  label="Per Extra KM Rate"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    min={0}
                    placeholder="Per Extra KM Rate"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name={["pricingDetails", "extraHrRate"]}
                  label="Per Extra Hour Rate"
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    min={0}
                    placeholder="Per Extra Hour Rate"
                  />
                </Form.Item>
              </Col>

              {/* <Col span={24}>
                <Form.Item label="Bill to">
                  <Select
                    placeholder="Company/Customer (Default)"
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </Input.Group>
        </div>
      </Card>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <Form.Item name="operatorNotes" label="Operator Notes">
          <TextArea placeholder="Add a note...."></TextArea>
        </Form.Item>
        <Form.Item name="driverNotes" label="Driver Notes">
          <TextArea placeholder="Add a note...."></TextArea>
        </Form.Item>
      </div>
      <Form.Item valuePropName="checked" name="isUnconfirmed" label="">
        <Checkbox>Mark as unconfirmed booking</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default AddNewBookingForm;
