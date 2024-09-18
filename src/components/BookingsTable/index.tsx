/* eslint-disable */

import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  MenuProps,
  Pagination,
  Space,
  Table,
  Tag,
} from "antd";

import styles from "./index.module.scss";
import { BOOKINGS_STATUS } from "../../constants/bookings";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useAppDispatch } from "../../hooks/store";
import {
  setIsAddEditDrawerOpen,
  setCurrentSelectedBooking,
  getBookings,
} from "../../redux/slices/bookingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";
import pagination, { PaginationProps } from "antd/es/pagination";

interface IBookingsTableData {
  key: React.Key;
  start_date: string;
  customer: string;
  passenger: string;
  vehicle_group: string;
  duty_type: string;
  duties: string;
  status: string;
}

const BookingsTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [conformedBookingModal, setConformedBookingModal] = useState(false);
  const { isAddEditDrawerOpen, currentSelectedBooking, bookings, pagination } =
    useSelector((state: RootState) => state.booking);

  const dispatch = useAppDispatch();

  function returnItems(row: any) {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div
            onClick={() => {
              // setCurrentSelectedBooking(row);
              dispatch(setCurrentSelectedBooking(row));
              setConformedBookingModal(true);
            }}
          >
            <Space>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              Confirm booking
            </Space>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: (
          <div
            onClick={() => {
              dispatch(setCurrentSelectedBooking(row));
              dispatch(setIsAddEditDrawerOpen());
            }}
          >
            <Space>
              <EyeOutlined twoToneColor="#52c41a" />
              View booking
            </Space>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: (
          <div>
            <Space>
              <EditOutlined twoToneColor="#52c41a" />
              Edit booking
            </Space>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "4",
        label: (
          <div>
            <Space>
              <FilePdfOutlined twoToneColor="#52c41a" />
              Generate invoice
            </Space>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "5",
        label: (
          <div
            style={{
              color: "#F04438",
            }}
          >
            <Space>
              <DeleteOutlined />
              Delete Booking
            </Space>
          </div>
        ),
      },
    ];
    return items;
  }

  const columns = [
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Passenger",
      dataIndex: "passenger",
      key: "passenger",
      render: (data: any) => {
        if (Array.isArray(data)) {
          return (
            <Space>
              {data[0]}
              <Badge
                className="site-badge-count-109"
                count={`+${data.length - 1}`}
                color="#47546770"
              />
            </Space>
          );
        } else {
          {
            return data;
          }
        }
      },
    },
    {
      title: "Vehicle group",
      dataIndex: "vehicleGroup",
      key: "vehicleGroup",
    },
    {
      title: "Duty type",
      dataIndex: "dutyType",
      key: "dutyType",
    },
    {
      title: "Duties",
      dataIndex: "duties",
      key: "duties",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data: any) => {
        if (data === BOOKINGS_STATUS.booked) {
          return <Tag color="red">{data}</Tag>;
        }
        if (data === BOOKINGS_STATUS.billed) {
          return <Tag color="success">{data}</Tag>;
        }
        if (data === BOOKINGS_STATUS.cancelled) {
          return <Tag color="">{data}</Tag>;
        }
        if (data === BOOKINGS_STATUS.completed) {
          return <Tag color="success">{data}</Tag>;
        }
        if (data === BOOKINGS_STATUS["on-going"]) {
          return <Tag color="blue">{data}</Tag>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (data: any, row: any) => {
        return (
          <div className={styles.columnsAction}>
            <DeleteOutlined
              onClick={() => {
                setDeleteModal(true);
                dispatch(setCurrentSelectedBooking(row));
              }}
              className={styles.deleteIcon}
            />
            <Dropdown menu={{ items: returnItems(row) }}>
              <MoreOutlined />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  function formateData() {
    return bookings.map((each: Object) => {
      return {
        ...each,
        action: "",
      };
    });
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === "Disabled User", // Column configuration not to be checked
      // name: record.name,
    }),
  };

  function handleCloseModal() {
    setDeleteModal(false);
    dispatch(setCurrentSelectedBooking({}));
  }
  function handleCloseBookingModal() {
    setConformedBookingModal(false);
    dispatch(setCurrentSelectedBooking({}));
  }

  console.log("bookings", bookings);
  useEffect(() => {
    dispatch(getBookings());
  }, []);
  // handleBookingsTablePageChange = (page, pageSize) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: batchActions.SET_FILTERS,
  //     payload: {
  //       page,
  //       per_page: pageSize,
  //     },
  //   });
  // };
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <Button>
          <ArrowLeftOutlined /> Previous
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button>
          Next <ArrowRightOutlined />
        </Button>
      );
    }
    return originalElement;
  };
  return (
    <>
      <div className={styles.container}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={formateData()}
          columns={columns}
          // pagination={{
          //   // po
          //   // defaultCurrent: 1,
          //   total: pagination?.total ?? 0,
          //   current: pagination?.page ?? 1,
          //   // pageSize: pagination.limit ?? 10,
          //   pageSize: 2,
          //   // onChange: handleBookingsTablePageChange,
          // }}
          pagination={false}
          scroll={{
            x: 756,
          }}
          footer={() => (
            <Pagination
              total={pagination?.total ?? 0}
              current={pagination?.page ?? 1}
              // pageSize: pagination.limit ?? 10,
              pageSize={1}
              align="center"
              itemRender={itemRender}
              className="custom-pagination"
            />
          )}
        />
      </div>
      {/* delete booking */}
      <Modal show={deleteModal} onClose={() => handleCloseModal()}>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Delete booking</div>
            <div className={styles.secondaryText}>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </div>
            <div>customer:{currentSelectedBooking?.customer}</div>
            <div>Vehicle Group:{currentSelectedBooking?.vehicleGroup}</div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                handleCloseModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
        {/* {JSON.stringify(currentDeleteBooking)} */}
      </Modal>
      {/* confirmed booking */}
      <Modal
        show={conformedBookingModal}
        onClose={() => handleCloseBookingModal()}
      >
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <div className={styles.primaryText}>Confirm booking</div>
            <div className={styles.secondaryText}>
              Are you sure you want to confirm this booking? Booking ID: 1234245
            </div>
            <div>customer:{currentSelectedBooking?.customer}</div>
            <div>Vehicle Group:{currentSelectedBooking?.vehicleGroup}</div>
          </div>
          <div className={styles.bottomBtns}>
            <button
              className={styles.cancelBtn}
              onClick={handleCloseBookingModal}
            >
              Cancel
            </button>
            <button
              className={styles.confirmBtn}
              onClick={() => {
                handleCloseBookingModal();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      {/* <Drawer
        destroyOnClose
        size="large"
        mask
        title={
          <div>
            <div>View Booking</div>
            <small>See your booking details here</small>
          </div>
        }
        onClose={() => {
          // setOpenAddDrawer(false);
          dispatch(setIsAddEditDrawerClose());
        }}
        open={isAddEditDrawerOpen}
      >
        <div>
          <AddNewBookingForm
            initialData={{
              bookingId: "123",
            }}
            isEditable={true}
          />
        </div>
      </Drawer> */}
    </>
  );
};

export default BookingsTable;
