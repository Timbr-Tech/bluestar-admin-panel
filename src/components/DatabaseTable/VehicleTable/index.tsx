/* eslint-disable */
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  getVehicle,
  deleteVehicle,
  getVehicleById,
  setViewContentDatabase,
} from "../../../redux/slices/databaseSlice";
import { VEHICLES } from "../../../constants/database";
import { ReactComponent as DeleteIconRed } from "../../../icons/trash-red.svg";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import Modal from "../../Modal";
import type { MenuProps } from "antd";
import { Table, TableProps, Dropdown } from "antd";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
import CustomPagination from "../../Common/Pagination";

interface IVehicleTable {
  _id: string;
  modelName: string;
  group: string;
  assigned_driver: string;
  vehicleNumber: string;
}

interface IVehicleTableTable {
  handleOpenSidePanel: () => void;
}

const VehicleTable = ({ handleOpenSidePanel }: IVehicleTableTable) => {
  const dispatch = useAppDispatch();
  const { vehicleStates, vehicleList, q, deleteVehicleStates, pagination } =
    useAppSelector((state) => state.database);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vehicleId, setVehicleId] = useState<string>("");
  const [vehicleName, setVehicleName] = useState("");

  const handleDeleteVehicle = () => {
    dispatch(deleteVehicle({ id: vehicleId }));
    setOpenDeleteModal(false);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getVehicleById({ id: vehicleId }));
      handleOpenSidePanel();
    }
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit vehicle",
      key: "1",
      icon: <EditIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    dispatch(getVehicle({ search: q }));
  }, [q]);

  const columns: TableProps<IVehicleTable>["columns"] = [
    ...VEHICLES,
    {
      title: "",
      dataIndex: "action",
      className: "action-column",
      render: (_, record) => (
        <div className={styles.editButton} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setVehicleId(record._id);
              setVehicleName(record?.modelName);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setVehicleId(record._id)}
            >
              <DotsHorizontal />
            </button>
          </Dropdown>
        </div>
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
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(getVehicleById({ id: record._id }));
              handleOpenSidePanel();
              dispatch(setViewContentDatabase(true));
            },
          };
        }}
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
        loading={vehicleStates?.loading || deleteVehicleStates?.loading}
        pagination={false}
        scroll={{
          x: 756,
        }}
        footer={() => (
          <CustomPagination
            total={pagination?.total ?? 0}
            current={pagination?.page ?? 1}
            pageSize={pagination.limit ?? 10}
            onPageChange={(page: number) => {
              dispatch(
                getVehicle({
                  search: q,
                  page: page,
                })
              );
            }}
          />
        )}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.deleteContainer}>
          <DeleteIconRed />
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete vehicle</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this vehicle?{" "}
              <div className={styles.selectedSecondaryText}>{vehicleName}</div>
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
