/* eslint-disable */
import { Button, Form, Input, notification, Spin } from "antd";
import styles from "../DutyTypeTable/index.module.scss";
import { useEffect, useState } from "react";
import SecondaryBtn from "../../SecondaryBtn";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  addVehicleGroup,
  updateVehicleGroup,
  setViewContentDatabase,
} from "../../../redux/slices/databaseSlice";
import PrimaryBtn from "../../PrimaryBtn";
import { ReactComponent as EditIcon } from "../../../icons/edit-icon.svg";
import CustomizeRequiredMark from "../../Common/CustomizeRequiredMark";

type NotificationType = "success" | "info" | "warning" | "error";

interface IVehicleGroupForm {
  handleCloseSidePanel: () => void;
}

const VehicleGroupForm = ({ handleCloseSidePanel }: IVehicleGroupForm) => {
  const [api, contextHolder] = notification.useNotification();
  const {
    selectedVehicleGroup,
    updateVehicleGroupStates,
    vehicleGroupStates,
    viewContentDatabase,
  } = useAppSelector((state) => state.database);

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
    if (Object.keys(selectedVehicleGroup).length) {
      dispatch(
        updateVehicleGroup({
          payload: values,
          id: selectedVehicleGroup?.data?._id,
        })
      );
    } else {
      dispatch(addVehicleGroup(values));
    }
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(selectedVehicleGroup).length) {
      form.setFieldsValue({
        name: selectedVehicleGroup?.data?.name || "",
        seatingCapacity: selectedVehicleGroup?.data?.seatingCapacity || null,
        description: selectedVehicleGroup?.data?.description || "",
        luggageCapacity: selectedVehicleGroup?.data?.luggageCapacity || null,
      });
    }
  }, [selectedVehicleGroup]);

  return (
    <div className={styles.formContainer}>
      {contextHolder}
      {vehicleGroupStates.loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div className={styles.header}>
            {Object.keys(selectedVehicleGroup).length
              ? viewContentDatabase
                ? "Vehicle Group"
                : "Edit Vehicle Group"
              : "New Vehicle Group"}
          </div>
          <div className={styles.primaryText}>
            {Object.keys(selectedVehicleGroup).length
              ? viewContentDatabase
                ? "View vehicle group details"
                : "Update or modify vehicle group details"
              : "Add details of your vehicle group"}
          </div>
        </div>
        <Form
          name="VehicleGroupForm"
          layout="vertical"
          onFinishFailed={(err) => {
            console.log(err);
          }}
          onFinish={(values) => {
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
            name: selectedVehicleGroup?.data?.name || "",
            seatingCapacity:
              selectedVehicleGroup?.data?.seatingCapacity || null,
            description: selectedVehicleGroup?.data?.description || "",
            luggageCapacity:
              selectedVehicleGroup?.data?.luggageCapacity || null,
          }}
          autoComplete="off"
          requiredMark={CustomizeRequiredMark}
          disabled={viewContentDatabase}
        >
          <div className={styles.form}>
            <div className={styles.typeContainer}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vehicle group is required",
                  },
                ]}
                label="Name"
                name="name"
                id="name"
              >
                <Input type="text" placeholder="Enter Vehicle Group" />
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
                    message: "Description is required",
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
                  min={0} // name="seatingCapacity"
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
                    message: "Luggage count is required",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
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
            loading={
              updateVehicleGroupStates.loading || vehicleGroupStates.loading
            }
            className="primary-btn"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default VehicleGroupForm;
