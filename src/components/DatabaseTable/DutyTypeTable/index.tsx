/* eslint-disable */
import { DUTY_TYPES } from "../../../constants/database";
import {
  getAllDutyTypes,
  getDutyTypeById,
  deleteDutyType,
} from "../../../redux/slices/databaseSlice";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import Modal from "../../Modal";
import type { MenuProps } from "antd";
import { Table, TableProps, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface IDutyTypeTableData {
  _id: string;
  name: string;
  type: string;
  max_kilometers: number;
  max_hours: number;
}

interface IDutyTypeTable {
  handleOpenSidePanel: () => void;
}

const DutyTypeTable = ({ handleOpenSidePanel }: IDutyTypeTable) => {
  const dispatch = useAppDispatch();
  const {
    selectedDutyType,
    dutyTypeList,
    q,
    deleteDutyTypeStates,
    dutyTypeStates,
  } = useAppSelector((state) => state.database);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dutyTypeId, setDutyTypeId] = useState<string>("");

  const handleDeleteDutyType = () => {
    dispatch(deleteDutyType({ id: dutyTypeId }));
    setOpenDeleteModal(false);
  };

  console.log(dutyTypeList, "dutyTypeList");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getDutyTypeById({ id: dutyTypeId }));
      handleOpenSidePanel();
    }
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit duty type",
      key: "1",
      icon: <EditIcon />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    dispatch(getAllDutyTypes({ page: "1", search: q, limit: 10 }));
  }, [q]);

  const columns: TableProps<IDutyTypeTableData>["columns"] = [
    ...DUTY_TYPES,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.editButton}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setDutyTypeId(record._id);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setDutyTypeId(record._id)}
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
    selectedRows: IDutyTypeTableData[]
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
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={dutyTypeList?.data}
        loading={deleteDutyTypeStates?.loading || dutyTypeStates?.loading}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete vehicle</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this duty type? This action cannot
              be undone.
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteDutyType}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DutyTypeTable;
