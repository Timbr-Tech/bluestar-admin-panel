/* eslint-disable */
import { Button, Form, Input, notification } from "antd";
import styles from "../DutyTypeTable/index.module.scss";
import SecondaryBtn from "../../SecondaryBtn";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/store";
import { addVehicleGroup } from "../../../redux/slices/databaseSlice";
import PrimaryBtn from "../../PrimaryBtn";

type NotificationType = "success" | "info" | "warning" | "error";

interface IVehicleGroupForm {
  handleCloseSidePanel: () => void;
}

const VehicleGroupForm = ({ handleCloseSidePanel }: IVehicleGroupForm) => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Vehicle group added",
      description: "Vehicle group added to the database",
    });
  };

  // const handleVehicleGroupChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setVehicleGroup({ ...vehicleGroup, name: e.target.value });
  //   } else if (e.target.name === "seatingCapacity") {
  //     setVehicleGroup({
  //       ...vehicleGroup,
  //       seatingCapacity: Number(e.target.value),
  //     });
  //   } else if (e.target.name === "description") {
  //     setVehicleGroup({ ...vehicleGroup, description: e.target.value });
  //   } else if (e.target.name === "luggageCapacity") {
  //     setVehicleGroup({
  //       ...vehicleGroup,
  //       luggageCapacity: Number(e.target.value),
  //     });
  //   }
  // };

  const handleSubmitForm = (values: any) => {
    dispatch(addVehicleGroup(values));
    openNotificationWithIcon("success");
    // handleCloseSidePanel();
  };
  const [form] = Form.useForm();

  return (
    <div className={styles.formContainer}>
      {/* {contextHolder} */}

      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>Vehicle Group</div>
          <div className={styles.primaryText}>Redesign of untitledui.com</div>
        </div>
        <Form
          name="VehicleGroupForm"
          layout="vertical"
          onFinishFailed={(err) => {
            console.log(err);
          }}
          onFinish={(values) => {
            console.log(values);
            const res = {
              ...values,
              seatingCapacity: Number(values.seatingCapacity),
              luggageCapacity: Number(values.luggageCapacity),
            };
            handleSubmitForm(res);
            form.resetFields();
          }}
          form={form}
          initialValues={{
            name: "",
            seatingCapacity: null,
            description: "",
            luggageCapacity: null,
          }}
          autoComplete="off"
        >
          <div className={styles.form}>
            <div className={styles.typeContainer}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "description is required",
                  },
                ]}
              >
                <Input
                  // className={styles.input}
                  // name="name"
                  type="text"
                  placeholder="Enter Vehicle Group"
                  // value={vehicleGroup.name}
                  // onChange={handleVehicleGroupChange}
                />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              {/* <div className={styles.text}>
                <p>Description</p>
              </div> */}
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "description is required",
                  },
                ]}
              >
                <Input.TextArea
                  // name="description"
                  className={styles.textarea}
                  placeholder="Enter a description..."
                  // value={vehicleGroup.description}
                  // onChange={handleVehicleGroupChange}
                />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              {/* <div className={styles.text}>
                <p>Seating Capacity (excluding driver)</p>
              </div> */}
              <Form.Item
                label="Seating Capacity (excluding driver)"
                name="seatingCapacity"
                rules={[
                  {
                    required: true,
                    message: "Seating Capacity is required",
                  },
                ]}
              >
                <Input
                  type="number"
                  // name="seatingCapacity"
                  // className={styles.input}
                  placeholder="Enter value ..."
                  // value={vehicleGroup.seatingCapacity}
                  // onChange={handleVehicleGroupChange}
                />
              </Form.Item>
            </div>
            <div className={styles.typeContainer}>
              {/* <div className={styles.text}>
                <p>Luggage count</p>
              </div> */}
              <Form.Item
                label="Luggage count"
                name="luggageCapacity"
                rules={[
                  {
                    required: true,
                    message: "Seating Capacity is required",
                  },
                ]}
              >
                <Input
                  type="number"
                  // name="luggageCapacity"
                  // className={styles.input}
                  placeholder="Enter value ..."
                  // value={vehicleGroup.luggageCapacity}
                  // onChange={handleVehicleGroupChange}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className={styles.bottomContainer}>
        <Button onClick={handleCloseSidePanel}>Cancel</Button>

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            form.submit();
          }}
          // onClick={handleSubmitForm}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default VehicleGroupForm;
