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
import { ReactComponent as DeleteIconRed } from "../../../icons/trash-red.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import Modal from "../../Modal";
import type { MenuProps } from "antd";
import { Table, TableProps, Dropdown } from "antd";
import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import CustomPagination from "../../Common/Pagination";
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
    pagination,
  } = useAppSelector((state) => state.database);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dutyTypeId, setDutyTypeId] = useState<string>("");
  const [dutyType, setDutyType] = useState({ name: "" });
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDeleteDutyType = () => {
    dispatch(deleteDutyType({ id: dutyTypeId }));
    setOpenDeleteModal(false);
  };

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

  // const handleClickOutside = (event: any) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setOpenDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   // Add event listener to detect outside clicks
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     // Remove event listener on cleanup to prevent memory leaks
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const columns: TableProps<IDutyTypeTableData>["columns"] = [
    ...DUTY_TYPES,
    {
      title: "",
      dataIndex: "action",
      className: "action-column",
      render: (_, record) => (
        <div
          className={styles.editButton}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <button
            onClick={() => {
              setOpenDeleteModal(true);
              setDutyTypeId(record._id);
              setDutyType(record);
            }}
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </button>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <button
              className={cn(styles.button, {
                [styles.selected]: dutyTypeId === record._id && openDropdown,
              })}
              onClick={() => {
                setDutyTypeId(record._id);
              }}
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
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(getDutyTypeById({ id: record._id }));
              handleOpenSidePanel();
            },
          };
        }}
        rowClassName={styles.rowstyles}
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={dutyTypeList?.data?.map((data: any) => {
          return {
            ...data,
            max_kilometers: data?.pricing[0]?.extraKmRate,
            max_hours: data?.pricing[0]?.extraHrRate,
          };
        })}
        loading={deleteDutyTypeStates?.loading || dutyTypeStates?.loading}
        pagination={false}
        scroll={{
          x: 756,
        }}
        onHeaderRow={(columns) => {
          return {
            style: {
              backgroundColor: "#1890ff",
              color: "white",
              fontWeight: "bold",
            },
          };
        }}
        footer={() => (
          <CustomPagination
            total={pagination?.total ?? 0}
            current={pagination?.page ?? 1}
            pageSize={pagination.limit ?? 10}
            onPageChange={(page: number) => {}}
          />
        )}
      />
      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <div className={styles.deleteContainer}>
          <DeleteIconRed />
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete duty type</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this duty type?
              <div className={styles.selectedSecondaryText}>
                {dutyType?.name}
              </div>
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
