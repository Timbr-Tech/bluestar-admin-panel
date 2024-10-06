/* eslint-disable */

import { Badge, Dropdown, MenuProps, Space, Table, Tag } from "antd";
import { ReactComponent as DeleteIconRed } from "../../icons/trash-red.svg";
import styles from "./index.module.scss";
import { BOOKINGS_STATUS } from "../../constants/bookings";
import {
  CheckCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useAppDispatch } from "../../hooks/store";
import {
  setIsAddEditDrawerOpen,
  setCurrentSelectedBooking,
  getBookings,
  setIsEditingBooking,
} from "../../redux/slices/bookingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";

import CustomPagination from "../Common/Pagination";

const BookingsTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [conformedBookingModal, setConformedBookingModal] = useState(false);
  const {
    isAddEditDrawerOpen,
    currentSelectedBooking,
    bookings,
    bookingStates,
    pagination,
    filters,
  } = useSelector((state: RootState) => state.booking);

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
              dispatch(setIsEditingBooking(false));
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
          <div
            onClick={() => {
              dispatch(setCurrentSelectedBooking(row));
              dispatch(setIsAddEditDrawerOpen());
              dispatch(setIsEditingBooking(true));
            }}
          >
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
      title: "Custom booking Id",
      dataIndex: "customBookingId",
      key: "customBookingId",
    },
    {
      title: "Alternate option",
      dataIndex: "assignAlternateVehicles",
      key: "assignAlternateVehicles",
      render: (each: any) => (each === false ? "No" : "Yes"),
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customerId",
      render: (each: any) => {
        return <span>{each.name}</span>;
      },
    },
    {
      title: "Booked By",
      dataIndex: "bookedBy",
      key: "bookedBy",
      render: (each: any) => {
        return (
          <div>
            <p>
              {" "}
              <UserOutlined /> {each.name}
            </p>
            <p>
              {" "}
              <PhoneOutlined /> {each.phoneNumber}
            </p>
            <p>
              {" "}
              <MailOutlined /> {each.email}
            </p>
          </div>
        );
      },
    },
    {
      title: "Passenger",
      dataIndex: "passergers",
      key: "passergers",
      render: (data: any) => {
        if (Array.isArray(data)) {
          if (data.length <= 0) {
            return "No passenger data";
          }
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
      title: "Airport Booking",
      dataIndex: "isAirportBooking",
      key: "isAirportBooking",
      render: (each: any) => (each === false ? "No" : "yes"),
    },
    {
      title: "Confirmed Status",
      dataIndex: "isUnconfirmed",
      key: "isUnconfirmed",
      render: (each: any) => (each === false ? "Yes" : "No"),
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (data: any) => {
        if (data.toLowerCase() === BOOKINGS_STATUS.booked) {
          return <Tag color="">{data}</Tag>;
        }
        if (data.toLowerCase() === BOOKINGS_STATUS.billed) {
          return <Tag color="success">{data}</Tag>;
        }
        if (data.toLowerCase() === BOOKINGS_STATUS.cancelled) {
          return <Tag color="">{data}</Tag>;
        }
        if (data.toLowerCase() === BOOKINGS_STATUS.completed) {
          return <Tag color="success">{data}</Tag>;
        }
        if (data.toLowerCase() === BOOKINGS_STATUS["on-going"]) {
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
    return bookings?.map((each: Object) => {
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

  useEffect(() => {
    dispatch(getBookings({ ...filters }));
  }, [filters.search, filters.status]);

  return (
    <>
      <div className={styles.container}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          bordered
          loading={bookingStates.loading}
          dataSource={formateData()}
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
              onPageChange={(page: number) => {
                dispatch(
                  getBookings({
                    search: filters.search,
                    page: page,
                  })
                );
              }}
            />
          )}
        />
      </div>
      {/* delete booking */}
      <Modal show={deleteModal} onClose={() => handleCloseModal()}>
        <div className={styles.deleteContainer}>
          <DeleteIconRed />
        </div>
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
