/* eslint-disable */
import { TAXES_TABLE } from "../../../constants/database";
import { Table, TableProps, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Modal from "../../Modal";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as Clipboard } from "../../../icons/clipboard-x.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { getTaxes, deleteTax } from "../../../redux/slices/databaseSlice";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface ITaxesTableData {
  _id: string;
  name: string;
  percentage: string;
  status: any;
}

const TaxesTable = () => {
  const { taxes, taxesStates, deleteTaxesState, q } = useAppSelector(
    (state) => state.database
  );
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taxId, setTaxId] = useState("");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click left button", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit vehicle",
      key: "1",
      icon: <EditIcon />,
    },
    {
      label: "Mark Inactive",
      key: "2",
      icon: <Clipboard />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: TableProps<ITaxesTableData>["columns"] = [
    ...TAXES_TABLE,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.editButton}>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setTaxId(record._id);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button className={styles.button}>
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

  const handleDeleteVehicleGroup = () => {
    dispatch(deleteTax({ id: taxId }));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(
      getTaxes({
        page: 1,
        search: q,
        limit: 7,
      })
    );
  }, [q]);

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ITaxesTableData[]
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
        dataSource={taxes?.data}
        loading={taxesStates?.loading || deleteTaxesState?.loading}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete tax</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this tax? This action cannot be
              undone.
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

export default TaxesTable;
