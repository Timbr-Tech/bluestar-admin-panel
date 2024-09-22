/* eslint-disable */
import { BANK_ACCOUNTS } from "../../../constants/database";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  getBankAccount,
  deleteBankAccount,
} from "../../../redux/slices/databaseSlice";
import { Table } from "antd";
import type { TableProps } from "antd";
import Modal from "../../Modal";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CustomPagination from "../../Common/Pagination";

interface IBankAccountsTable {
  _id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifsc: string;
  notes: string;
}

const BankAccountsTable = () => {
  const dispatch = useAppDispatch();
  const {
    bankAccounts,
    bankAccountStates,
    deleteBankAccountStates,
    q,
    pagination,
  } = useAppSelector((state) => state.database);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteBankAccountId, setDeleteBankAccountId] = useState<string>("");

  const handleDeleteBankAccount = () => {
    dispatch(deleteBankAccount({ id: deleteBankAccountId }));
    setOpenDeleteModal(false);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const columns: TableProps<IBankAccountsTable>["columns"] = [
    ...BANK_ACCOUNTS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setOpenDeleteModal(true);
            setDeleteBankAccountId(record._id);
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
      getBankAccount({
        page: 1,
        search: q,
        limit: "",
      })
    );
  }, [q]);

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IBankAccountsTable[]
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
        bordered
        columns={columns}
        dataSource={bankAccounts?.data}
        loading={bankAccountStates?.loading || deleteBankAccountStates?.loading}
        pagination={false}
        scroll={{
          x: 756,
        }}
        footer={() => (
          <CustomPagination
            total={pagination?.total ?? 0}
            current={pagination?.page ?? 1}
            pageSize={pagination.limit ?? 10}
          />
        )}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete bank account</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this bank account? This action
              cannot be undone.
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={handleDeleteBankAccount}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BankAccountsTable;
