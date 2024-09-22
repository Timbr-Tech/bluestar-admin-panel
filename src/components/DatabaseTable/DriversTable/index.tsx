/* eslint-disable */
import {
  getDrivers,
  getDriverById,
  deleteDriver,
} from "../../../redux/slices/databaseSlice";
import Modal from "../../Modal";
import type { TableProps, MenuProps } from "antd";
import { Table, Dropdown } from "antd";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { DRIVERS } from "../../../constants/database";
import styles from "./index.module.scss";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Common/Pagination";

interface IDriversTableData {
  _id: string;
  name: string;
  driverId: string;
  phoneNumber: string;
  status: any;
}

interface IDriversTable {
  handleOpenSidePanel: () => void;
}

const DriversTable = ({ handleOpenSidePanel }: IDriversTable) => {
  const dispatch = useAppDispatch();
  const { driverList, driverStates, deleteDriverStates, q, pagination } =
    useAppSelector((state) => state.database);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [driverId, setDriverId] = useState<string>("");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getDriverById({ id: driverId }));
      handleOpenSidePanel();
    }
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteDriver = () => {
    dispatch(deleteDriver({ id: driverId }));
    setOpenDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit driver",
      key: "1",
      icon: <EditIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    dispatch(
      getDrivers({
        page: 1,
        search: q,
        limit: 10,
      })
    );
  }, [q]);

  const columns: TableProps<IDriversTableData>["columns"] = [
    ...DRIVERS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.editButton}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setDriverId(record._id);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setDriverId(record._id)}
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
    selectedRows: IDriversTableData[]
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
        pagination={false}
        scroll={{
          x: 756,
        }}
        footer={() => (
          <CustomPagination
            total={pagination?.total ?? 0}
            current={pagination?.page ?? 1}
            pageSize={pagination.limit ?? 10}
            onPageChange={() => {
              // dispatch(setPagination())
            }}
          />
        )}
        dataSource={driverList?.data?.map((data: any) => {
          return {
            ...data,
            status: (
              <div className={cn(styles.status, { [styles.active]: true })}>
                <div className={cn(styles.dot, { [styles.active]: true })} />
                {"Active"}
              </div>
            ),
          };
        })}
        loading={driverStates?.loading || deleteDriverStates?.loading}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete tax</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this driver? This action cannot be
              undone.
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteDriver}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DriversTable;
