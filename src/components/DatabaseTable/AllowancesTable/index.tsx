/* eslint-disable */
import { ALLOWANCES_TABLE } from "../../../constants/database";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { Table, TableProps, Dropdown } from "antd";
import { ReactComponent as DeleteIconRed } from "../../../icons/trash-red.svg";
import type { MenuProps } from "antd";
import {
  getAllowances,
  getAllowanceById,
  deleteAllowance,
  setViewContentDatabase,
} from "../../../redux/slices/databaseSlice";
import Modal from "../../Modal";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

import CustomPagination from "../../Common/Pagination";

interface IAllowanceData {
  key: string;
  _id: string;
  allowanceType: string;
  rate: number;
}

interface IAllowanceTable {
  handleOpenSidePanel: () => void;
}

const AllowancesTable = ({ handleOpenSidePanel }: IAllowanceTable) => {
  const {
    allowancesList,
    allowanceStates,
    deleteAllowancesStates,
    q,
    pagination,
  } = useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [allowanceId, setAllowanceId] = useState("");
  const [allowanceName, setAllowanceName] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getAllowanceById({ id: allowanceId }));
      handleOpenSidePanel();
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit allowance",
      key: "1",
      icon: <EditIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: TableProps<IAllowanceData>["columns"] = [
    ...ALLOWANCES_TABLE,
    {
      title: "",
      dataIndex: "action",
      className: "action-column",
      render: (_, record) => (
        <div className={styles.editButton} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setAllowanceId(record._id);
              setAllowanceName(record?.allowanceType);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setAllowanceId(record._id)}
            >
              <DotsHorizontal />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteAllowance = () => {
    dispatch(deleteAllowance({ id: allowanceId }));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(
      getAllowances({
        search: q,
      })
    );
  }, [q]);

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IAllowanceData[]
  ) => {
    console.log(selectedRowKeys, "selectedRowKeys");
    setSelectedRowKeys(selectedRowKeys);
    console.log("Selected Rows: ", selectedRows);
  };

  return (
    <>
      <Table
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(getAllowanceById({ id: record._id }));
              handleOpenSidePanel();
              dispatch(setViewContentDatabase(true));
            },
          };
        }}
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
          selectedRowKeys: selectedRowKeys,
        }}
        columns={columns}
        dataSource={allowancesList?.data?.map((data: any) => ({
          ...data,
          key: data?._id,
        }))}
        loading={allowanceStates?.loading || deleteAllowancesStates?.loading}
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
                getAllowances({
                  search: q,
                  page,
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
            <div className={styles.primaryText}>Delete allowance</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this Allowance?{" "}
              <div className={styles.selectedSecondaryText}>
                {allowanceName}
              </div>
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={handleDeleteAllowance}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllowancesTable;
