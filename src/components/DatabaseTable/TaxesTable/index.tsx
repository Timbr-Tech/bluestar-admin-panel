/* eslint-disable */
import { TAXES_TABLE } from "../../../constants/database";
import { Table, TableProps, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Modal from "../../Modal";
import cn from "classnames";
import { ReactComponent as DeleteIconRed } from "../../../icons/trash-red.svg";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { ReactComponent as DotsHorizontal } from "../../../icons/dots-horizontal.svg";
import { ReactComponent as Clipboard } from "../../../icons/clipboard-x.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit-02.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  getTaxes,
  deleteTax,
  getTaxesById,
  updateTax,
  setViewContentDatabase,
} from "../../../redux/slices/databaseSlice";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import CustomPagination from "../../Common/Pagination";

interface ITaxesTableData {
  _id: string;
  name: string;
  percentage: string;
  status: any;
}

interface ITaxesTable {
  handleOpenSidePanel: () => void;
}

const TaxesTable = ({ handleOpenSidePanel }: ITaxesTable) => {
  const { taxes, taxesStates, deleteTaxesState, q, pagination } =
    useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();
  const [currentTax, setCurrentTax] = useState<any>({});
  const [taxName, setTaxName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taxId, setTaxId] = useState("");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      dispatch(getTaxesById({ id: taxId }));
      handleOpenSidePanel();
    } else if (e.key === "2") {
      dispatch(
        updateTax({
          payload: { isActive: currentTax?.isActive ? false : true },
          id: currentTax?._id,
        })
      );
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click left button", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit tax",
      key: "1",
      icon: <EditIcon />,
    },
    {
      label: <>{currentTax?.isActive ? "Mark inactive" : "Mark Active"}</>,
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
      className: "action-column",
      render: (_, record) => (
        <div
          className={styles.editButton}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentTax(record);
          }}
        >
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setTaxId(record._id);
              setTaxName(record?.name);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={styles.button}
              onClick={() => setTaxId(record._id)}
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

  const handleDeleteTax = () => {
    dispatch(deleteTax({ id: taxId }));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(
      getTaxes({
        search: q,
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
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(getTaxesById({ id: record._id }));
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
        dataSource={taxes?.data?.map((data: any) => {
          return {
            ...data,
            status: (
              <div
                className={cn(styles.status, {
                  [styles.active]: data?.isActive,
                })}
              >
                <div
                  className={cn(styles.dot, {
                    [styles.active]: data?.isActive,
                  })}
                />
                {data?.isActive ? "Active" : "Inactive"}
              </div>
            ),
          };
        })}
        loading={taxesStates?.loading || deleteTaxesState?.loading}
        pagination={false}
        scroll={{
          x: 756,
        }}
        footer={
          taxes?.data?.length !== 0
            ? () => (
                <CustomPagination
                  total={pagination?.total ?? 0}
                  current={pagination?.page ?? 1}
                  pageSize={pagination.limit ?? 10}
                  onPageChange={(page: number) => {
                    dispatch(
                      getTaxes({
                        search: q,
                        page: page,
                      })
                    );
                  }}
                />
              )
            : () => <></>
        }
      />

      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.deleteContainer}>
          <DeleteIconRed />
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete tax</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this tax?{" "}
              <div className={styles.selectedSecondaryText}>{taxName}</div>
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteTax}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaxesTable;
