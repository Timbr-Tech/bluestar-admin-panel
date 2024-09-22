/* eslint-disable */
import { VEHICLE_GROUPS } from "../../../constants/database";
import { Table } from "antd";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import Modal from "../../Modal";
import {
  getVehicleGroup,
  deleteVehicleGroup,
} from "../../../redux/slices/databaseSlice";
import type { TableProps } from "antd";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";

interface IVehicleGroupTableData {
  _id: string;
  name: string;
  vehicleCount: number;
}

interface IVehicleGroupTable {
  handleOpenSidePanel: () => void;
}

const VehicleGroupTable = ({ handleOpenSidePanel }: IVehicleGroupTable) => {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { vehicleGroupData, vehicleGroupStates, q } = useAppSelector(
    (state) => state.database
  );
  const [deleteVehicleGroupId, setDeleteVehicleGroupId] = useState<string>("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteVehicleGroup = () => {
    dispatch(deleteVehicleGroup({ id: deleteVehicleGroupId }));
    setOpenDeleteModal(false);
  };

  const columns: TableProps<IVehicleGroupTableData>["columns"] = [
    ...VEHICLE_GROUPS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setOpenDeleteModal(true);
            setDeleteVehicleGroupId(record._id);
          }}
          className={styles.deleteBtn}
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      getVehicleGroup({
        page: pagination.current,
        search: q,
        limit: 10,
      })
    );
  }, [q]);

  useEffect(() => {
    setPagination({
      ...pagination,
      pageSize: vehicleGroupData.limit,
      current: vehicleGroupData.page,
    });
  }, [vehicleGroupData]);

  const handleTableChange = (pagination: any) => {
    dispatch(
      getVehicleGroup({
        page: pagination.current,
        search: "",
        limit: pagination.pageSize,
      })
    );
  };

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IVehicleGroupTableData[]
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
        onChange={handleTableChange}
        dataSource={vehicleGroupData?.data}
        loading={vehicleGroupStates?.loading}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete vehicle group</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this vehicle group? This action
              cannot be undone.
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={handleDeleteVehicleGroup}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VehicleGroupTable;
