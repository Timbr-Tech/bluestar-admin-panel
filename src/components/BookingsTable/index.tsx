/* eslint-disable */

import {
  Badge,
  Dropdown,
  MenuProps,
  Popover,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { ReactComponent as DeleteIconRed } from "../../icons/trash-red.svg";
import styles from "./index.module.scss";
import {
  CheckCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
  HeatMapOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactComponent as DotsHorizontal } from "../../icons/dots-horizontal.svg";
import { ReactComponent as DeleteIcon } from "../../icons/trash.svg";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useAppDispatch } from "../../hooks/store";
import {
  setIsAddEditDrawerOpen,
  setCurrentSelectedBooking,
  getBookings,
  setIsEditingBooking,
  deleteBooking,
} from "../../redux/slices/bookingSlice";
import BookingsStates from "../States/BookingsStates";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";

import CustomPagination from "../Common/Pagination";
import { RouteName } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

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
            onClick={(e) => {
              // setCurrentSelectedBooking(row);
              e.stopPropagation();
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
            onClick={(e) => {
              e.stopPropagation();
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
            onClick={(e) => {
              e.stopPropagation();
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
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal(true);
              dispatch(setCurrentSelectedBooking(row));
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

  const columns: TableColumnsType<any> = [
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    // {
    //   title: "Custom booking Id",
    //   dataIndex: "customBookingId",
    //   key: "customBookingId",
    // },
    // {
    //   title: "Alternate option",
    //   dataIndex: "assignAlternateVehicles",
    //   key: "assignAlternateVehicles",
    //   render: (each: any) => (each === false ? "No" : "Yes"),
    // },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customerId",
      render: (each: any) => {
        return <span>{each.name}</span>;
      },
    },
    // {
    //   title: "Booked By",
    //   dataIndex: "bookedBy",
    //   key: "bookedBy",
    //   width: "200px",
    //   render: (each: any) => {
    //     return (
    //       <div>
    //         <p>
    //           <UserOutlined /> {each.name}
    //         </p>
    //         <p>
    //           <PhoneOutlined /> {each.phoneNumber}
    //         </p>
    //         <p>
    //           <MailOutlined /> {each.email}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Passenger",
      dataIndex: "passengers",
      key: "passengers",
      render: (data: any) => {
        if (Array.isArray(data)) {
          if (data.length <= 0) {
            return "No passengers data";
          }
          if (data.length == 1) {
            return data[0].name;
          }
          return (
            <Space>
              {data[0].name}

              <Popover
                content={() => {
                  return (
                    <>
                      {data?.map((each) => (
                        <div>
                          <p>
                            <UserOutlined /> {each.name}
                          </p>
                          <p>
                            <PhoneOutlined /> {each.phoneNumber}
                          </p>
                          <hr />
                        </div>
                      ))}
                    </>
                  );
                }}
                title="Passenger List"
              >
                <Badge color="yellow" count={`+${data.length - 1}`} />
              </Popover>
            </Space>
          );
        }
      },
    },
    {
      title: "Vehicle group",
      dataIndex: "vehicleGroupId",
      key: "vehicleGroupId",
      render: (each) => <span>{each?.name}</span>,
    },
    {
      title: "Duty type",
      dataIndex: "dutyTypeId",
      key: "dutyTypeId",
      render: (each) => {
        return <span>{each?.name}</span>;
      },
    },
    {
      title: "Duties",
      dataIndex: "duties",
      key: "duties",
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   render: (data) => {
    //     return (
    //       <div onClick={(event) => event.stopPropagation()}>
    //         <a href={data?.dropAddress} target="_blank">
    //           <PushpinOutlined /> Drop address
    //         </a>
    //         <br />
    //         <a href={data?.reportingAddress} target="_blank">
    //           <PushpinOutlined /> Reporting address
    //         </a>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Airport Booking",
    //   dataIndex: "isAirportBooking",
    //   key: "isAirportBooking",
    //   render: (each: any) => (each === false ? "No" : "yes"),
    // },
    // {
    //   title: "Confirmed Status",
    //   dataIndex: "isUnconfirmed",
    //   key: "isUnconfirmed",
    //   render: (each: any) => (each === false ? "Yes" : "No"),
    // },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (data: any) => {
        return <BookingsStates status={data.toLowerCase()} />;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      className: "custom-column",
      render: (data: any, row: any) => {
        return (
          <div
            className={styles.editButton}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
                dispatch(setCurrentSelectedBooking(row));
              }}
              className={styles.deleteBtn}
            >
              <DeleteIcon />
            </button>
            <Dropdown menu={{ items: returnItems(row) }} trigger={["click"]}>
              <button className={styles.button}>
                <DotsHorizontal />
              </button>
            </Dropdown>
          </div>

          // <div className={styles.columnsAction}>
          //   <DeleteOutlined
          //     onClick={(e) => {
          // console.log(row, "row");
          // e.stopPropagation();
          // setDeleteModal(true);
          // dispatch(setCurrentSelectedBooking(row));
          //     }}
          //     className={styles.deleteIcon}
          //   />
          //   <Dropdown menu={{ items: returnItems(row) }}>
          //     <MoreOutlined />
          //   </Dropdown>
          // </div>
        );
      },
    },
  ];

  function formateData() {
    return bookings?.map((each: any) => {
      return {
        ...each,
        address: {
          dropAddress: each?.dropAddress,
          reportingAddress: each?.reportingAddress,
        },
        vehicleGroupId: each.vehicleGroupId,
        id: each._id,
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
  let navigate = useNavigate();

  console.log(currentSelectedBooking, "currentSelectedBooking");

  return (
    <>
      <div className={styles.container}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(`${RouteName.BOOKINGS}/${record._id}`);
              },
            };
          }}
          bordered
          loading={bookingStates.loading}
          dataSource={formateData()}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
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
              {`Are you sure you want to delete this booking? Booking ID: ${currentSelectedBooking?.id}`}
            </div>
          </div>
          <div className={styles.bottomBtns}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                dispatch(deleteBooking({ id: currentSelectedBooking._id }));
                handleCloseModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
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
    </>
  );
};

export default BookingsTable;
