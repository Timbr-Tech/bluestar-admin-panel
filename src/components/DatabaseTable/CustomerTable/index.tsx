/* eslint-disable */
import { CUSTOMERS } from "../../../constants/database";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  getCustomer,
  deleteCustomer,
} from "../../../redux/slices/databaseSlice";
import Modal from "../../Modal";
import { Table, TableProps } from "antd";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";

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

  const { customers, customersStates, q } = useAppSelector(
    (state) => state.database
  );

  const handleDeleteVehicleGroup = () => {
    dispatch(deleteCustomer({ id: customerId }));
    setOpenDeleteModal(false);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const columns: TableProps<ICustomerTableData>["columns"] = [
    ...CUSTOMERS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setOpenDeleteModal(true);
            setCustomerId(record._id);
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
    selectedRows: ICustomerTableData[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  useEffect(() => {
    dispatch(getCustomer({ page: "1", search: q, limit: "" }));
  }, [q]);

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={customers?.data}
        loading={customersStates?.loading}
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
