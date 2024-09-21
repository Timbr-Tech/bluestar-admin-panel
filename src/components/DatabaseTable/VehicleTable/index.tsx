/* eslint-disable */
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { getVehicle, deleteVehicle } from "../../../redux/slices/databaseSlice";
import { VEHICLES } from "../../../constants/database";
import Modal from "../../Modal";
import { Table, TableProps } from "antd";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";

interface IVehicleTable {
  _id: string;
  modelName: string;
  group: string;
  assigned_driver: string;
  vehicleNumber: string;
}

const VehicleTable = () => {
  const dispatch = useAppDispatch();
  const { vehicleStates, vehicleList, q } = useAppSelector(
    (state) => state.database
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vehicleId, setVehicleId] = useState<string>("");

  const handleDeleteVehicle = () => {
    dispatch(deleteVehicle({ id: vehicleId }));
    setOpenDeleteModal(false);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(getVehicle({ page: "1", search: q, limit: 10 }));
  }, [q]);

  const columns: TableProps<IVehicleTable>["columns"] = [
    ...VEHICLES,
    { title: "Status", dataIndex: "status", render: () => <div>Active</div> },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setOpenDeleteModal(true);
            setVehicleId(record._id);
          }}
          className={styles.deleteBtn}
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IVehicleTable[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={vehicleList?.data?.map((data: any) => ({
          ...data,
          group: "Taxi",
          assigned_driver: data.registration.ownerName,
        }))}
        loading={vehicleStates?.loading}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete vehicle</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this vehicle? This action cannot
              be undone.
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteVehicle}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VehicleTable;
