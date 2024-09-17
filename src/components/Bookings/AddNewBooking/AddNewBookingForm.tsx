/* eslint-disable */
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  AutoCompleteProps,
  Form,
  Input,
  AutoComplete,
  Space,
  Card,
  Radio,
  Button,
  Select,
  Checkbox,
} from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";
import { isEditable } from "@testing-library/user-event/dist/utils";

const { TextArea } = Input;
interface AddNewBookingForm {
  initialData?: {
    bookingId: string;
  };
  isEditable?: boolean;
}
const AddNewBookingForm = ({
  initialData,
  isEditable = false,
}: AddNewBookingForm) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes("@")) {
        return [];
      }
      return ["gmail.com", "163.com", "qq.com"].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };
  const [passengers, setPassengers] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      disabled={isEditable}
      onFinish={() => {}}
      initialValues={initialData}
      requiredMark={CustomizeRequiredMark}
      className={styles.form}
    >
      <Form.Item
        name="bookingId"
        label="Booking Id"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Customer">
        <AutoComplete
          onSearch={handleSearch}
          placeholder="Select customer"
          options={options}
        />
      </Form.Item>

      <Card className={styles.BookedByCardContainer}>
        <p>Booked By</p>
        <Form.Item
          name="bookedByName"
          label="Booked by name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bookedByPhoneNumber"
          label="Booked by phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bookedByEmail"
          label="Booked by Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Radio>Use this same details for passenger</Radio>
      </Card>
      <Card className={styles.PassengerCardContainer}>
        <p>Passenger Details</p>
        {passengers.map((each, index) => (
          <Card className={styles.PassengerCard} key={each.email + each.name}>
            <Form.Item name={`passengerName-${index}`} label="Passenger name">
              <Input />
            </Form.Item>
            <Form.Item
              name={`passengerPhoneNumber-${index}`}
              label="passenger phone number"
            >
              <Input />
            </Form.Item>
            {passengers.length > 1 && (
              <Button
                shape="circle"
                className={styles.deletePassengerButton}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setPassengers((prev) =>
                    passengers.filter((each, idx) => idx !== index)
                  );
                }}
              />
            )}
          </Card>
        ))}

        <Button
          onClick={() => {
            setPassengers((prev) => [...prev, { name: "", email: "" }]);
          }}
        >
          <PlusOutlined /> Add more
        </Button>
      </Card>
      <Form.Item label="Vehicle Group">
        <Select
          placeholder="Duty type"
          style={{ width: `100%` }}
          onChange={() => {}}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Form.Item>
      <Form.Item label="Vehicle Group">
        <Select
          placeholder="Vehicle Group"
          style={{ width: `100%` }}
          onChange={() => {}}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        ></Select>
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

      <Form.Item label="Reporting Address">
        <TextArea placeholder="Location (Google map link)"></TextArea>
      </Form.Item>
      <Form.Item label="Drop Address">
        <TextArea placeholder="Location (Google map link)"></TextArea>
      </Form.Item>
    </Form>
  );
};

export default AddNewBookingForm;
