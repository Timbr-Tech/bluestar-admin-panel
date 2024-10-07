/* eslint-disable */
import { useState } from "react";
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
} from "antd";
import { DeleteOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import CustomDatePicker from "../../Common/CustomDatePicker";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { RootState } from "../../../types/store";
import {
  getAllDutyTypes,
  getCustomer,
  getVehicleGroup,
} from "../../../apis/database";

const { TextArea } = Input;
interface AddNewBookingForm {
  initialData?: {
    bookingId: string;
  };
  isEditable?: boolean;
  handleFormSubmit: (value?: any) => void;
  form: any;
}
const AddNewBookingForm = ({
  initialData,
  isEditable = true,
  handleFormSubmit,
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
  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      disabled={!isEditable}
      onFinishFailed={(errorInfo) => {
        console.log("Failed:", errorInfo);
      }}
      onFinish={(value) => {
        console.log(value);
        // handleFormSubmit(value);
      }}
      initialValues={initialData}
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
        {/* <p>Booked By</p> */}
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
              rules={[{ required: true }]}
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
              const currentPassengers = form.getFieldValue("passengers") || [];
              const bookedBy = form.getFieldValue("bookedBy") || [];
              // Set the new passengers array with the new data
              form.setFieldsValue({
                passengers: [
                  {
                    name: bookedBy.name,
                    phone: bookedBy.phoneNumber,
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
      <div className={styles.PassengerCardContainer}>
        <p>Passenger Details</p>
        <Form.List name="passengers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Card key={key} className="PassengerCard">
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
                    name={[name, "phone"]}
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
                      className="deletePassengerButton"
                    />
                  )}
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Passenger
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
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
      <Form.Item label="Booking type">
        <Radio.Group
          className={styles.bookingType}
          onChange={() => {}}
          value={""}
        >
          <Radio className={styles.item} value={1}>
            <b>Local booking</b>
            <p>Local rates would apply</p>
          </Radio>
          <Radio className={styles.item} value={2}>
            <b>Outstation booking</b>
            <p>Outstation rates would apply</p>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="">
        <Checkbox>This is an airport booking</Checkbox>
      </Form.Item>

      <Card>
        <b>Duration Details </b>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Date">
              <CustomDatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Date">
              <CustomDatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Start from garage before (in mins)">
              <TimePicker
                format="mm"
                style={{
                  width: "100%",
                }}
                onChange={() => {}}
              />
            </Form.Item>
          </Col>

          {/*  */}
        </Row>
      </Card>

      <Card style={{ marginTop: "1rem" }}>
        <div className={styles.pricingDetails}>
          <b>Pricing Details</b>
          <span>
            <SyncOutlined />
            Fetch from Contract
          </span>
        </div>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Base Rate">
              <Input type="text" placeholder="Prefilled based on Duty Type" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Per Extra KM Rate">
              <Input type="text" placeholder="Per Extra KM Rate" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Per Extra Hour Rate">
              <Input type="text" placeholder="Per Extra Hour Rate" />
            </Form.Item>
          </Col>

          <Col span={24}>
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
          </Col>
        </Row>
      </Card>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <Form.Item label="Operator Notes">
          <TextArea placeholder="Add a note...."></TextArea>
        </Form.Item>
        <Form.Item label="Driver Notes">
          <TextArea placeholder="Add a note...."></TextArea>
        </Form.Item>
      </div>
      <Form.Item label="">
        <Checkbox>Mark as unconfirmed booking</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default AddNewBookingForm;
