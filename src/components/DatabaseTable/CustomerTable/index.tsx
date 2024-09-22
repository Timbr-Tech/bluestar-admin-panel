/* eslint-disable */
import { CUSTOMERS } from "../../../constants/database";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  getCustomer,
  getCustomerById,
  deleteCustomer,
} from "../../../redux/slices/databaseSlice";
import type { MenuProps } from "antd";
import Modal from "../../Modal";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { Table, TableProps, Dropdown } from "antd";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
import CustomPagination from "../../Common/Pagination";

interface ICustomerTableData {
  _id: string;
  name: string;
  email: string;
  gstNumber: { taxDetails: { gstNumber: string } };
}

interface ICustomerTable {
  handleOpenSidePanel: () => void;
}

const CustomerTable = ({ handleOpenSidePanel }: ICustomerTable) => {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const { customers, customersStates, q, pagination } = useAppSelector(
    (state) => state.database
  );

  const handleDeleteVehicleGroup = () => {
    dispatch(deleteCustomer({ id: customerId }));
    setOpenDeleteModal(false);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getCustomerById({ id: customerId }));
      handleOpenSidePanel();
    }
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit Customer",
      key: "1",
      icon: <EditIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: TableProps<ICustomerTableData>["columns"] = [
    ...CUSTOMERS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.editButton}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setCustomerId(record._id);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setCustomerId(record._id)}
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
    selectedRows: ICustomerTableData[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  useEffect(() => {
    dispatch(getCustomer({ page: "1", search: q, limit: 10 }));
  }, [q]);

  return (
    <>
      <Table
        bordered
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={customers?.data}
        loading={customersStates?.loading}
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
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete customer</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this customer? This action cannot
              be undone.
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

export default CustomerTable;
