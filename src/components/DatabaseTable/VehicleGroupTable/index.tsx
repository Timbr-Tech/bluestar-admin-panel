/* eslint-disable */
import { VEHICLE_GROUPS } from "../../../constants/database";
import { Table, Dropdown } from "antd";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import Modal from "../../Modal";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as Clipboard } from "../../../icons/clipboard-x.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { ReactComponent as DeleteIconRed } from "../../../icons/trash-red.svg";
import type { MenuProps } from "antd";
import cn from "classnames";
import {
  getVehicleGroup,
  getVehicleGroupById,
  deleteVehicleGroup,
  updateVehicleGroup,
  setViewContentDatabase,
  setPagination,
} from "../../../redux/slices/databaseSlice";
import type { TableProps } from "antd";
import styles from "./index.module.scss";
import React, { useEffect, useState, useRef } from "react";
import CustomPagination from "../../Common/Pagination";

interface IVehicleGroupTableData {
  _id: string;
  name: string;
  vehicleCount: number;
  // status: any;
}

interface IVehicleGroupTable {
  handleOpenSidePanel: () => void;
}

const VehicleGroupTable = ({ handleOpenSidePanel }: IVehicleGroupTable) => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    vehicleGroupData,
    vehicleGroupStates,
    q,
    deleteVehicleGroupStates,
    pagination,
  } = useAppSelector((state) => state.database);
  const [vehicleGroup, setVehicleGroup] = useState({ name: "" });
  const [deleteVehicleGroupId, setDeleteVehicleGroupId] = useState<string>("");
  const [currentVehicleGroup, setCurrentVehicleGroup] = useState<any>({});
  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDeleteVehicleGroupId("");
    }
  };

  useEffect(() => {
    // Add event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener on cleanup to prevent memory leaks
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getVehicleGroupById({ id: deleteVehicleGroupId }));
      handleOpenSidePanel();
    } else if (e.key === "2") {
      dispatch(
        updateVehicleGroup({
          payload: { isActive: currentVehicleGroup?.isActive ? false : true },
          id: currentVehicleGroup?._id,
        })
      );
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit Vehicle Group",
      key: "1",
      icon: <EditIcon />,
    },
    {
      label: (
        <>{currentVehicleGroup?.isActive ? "Mark inactive" : "Mark Active"}</>
      ),
      key: "2",
      icon: <Clipboard />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleDeleteVehicleGroup = () => {
    console.log(deleteVehicleGroupId, "deleteVehicleGroupId");
    dispatch(deleteVehicleGroup({ id: deleteVehicleGroupId }));
    setOpenDeleteModal(false);
  };

  const columns: TableProps<IVehicleGroupTableData>["columns"] = [
    ...VEHICLE_GROUPS,
    {
      title: "",
      dataIndex: "action",
      className: "action-column",
      render: (_, record) => (
        <div
          className={styles.editButton}
          ref={dropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentVehicleGroup(record);
          }}
        >
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setDeleteVehicleGroupId(record._id);
              setVehicleGroup(record);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={cn(styles.button, {
                [styles.selected]: deleteVehicleGroupId === record._id,
              })}
              onClick={() => setDeleteVehicleGroupId(record._id)}
            >
              <DotsHorizontal />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      getVehicleGroup({
        page: 1,
        limit: "",
        search: q,
      })
    );
  }, [q]);

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
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(getVehicleGroupById({ id: record._id }));
              dispatch(setViewContentDatabase(true));
              handleOpenSidePanel();
            },
          };
        }}
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={vehicleGroupData?.data?.map((data: any) => {
          return {
            ...data,
            // status: (
            //   <div
            //     className={cn(styles.status, {
            //       [styles.active]: data?.isActive,
            //     })}
            //   >
            //     <div
            //       className={cn(styles.dot, {
            //         [styles.active]: data?.isActive,
            //       })}
            //     />
            //     {data?.isActive ? "Active" : "Inactive"}
            //   </div>
            // ),
          };
        })}
        loading={
          vehicleGroupStates?.loading || deleteVehicleGroupStates?.loading
        }
        pagination={false}
        scroll={{
          x: 756,
        }}
        footer={() => (
          <CustomPagination
            total={pagination?.total}
            current={pagination?.page}
            pageSize={pagination.limit}
            onPageChange={(page: number) => {
              dispatch(
                getVehicleGroup({
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
            <div className={styles.primaryText}>Delete vehicle group</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this vehicle group?{" "}
              <div className={styles.selectedSecondaryText}>
                {vehicleGroup?.name}
              </div>
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
