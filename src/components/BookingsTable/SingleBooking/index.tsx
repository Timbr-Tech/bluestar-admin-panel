/* eslint-disable */

import {
  Badge,
  Dropdown,
  MenuProps,
  Popover,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import styles from "../index.module.scss";

import {
  CarOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  PushpinOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RouteName } from "../../../constants/routes";
import { RootState } from "../../../types/store";
import CustomPagination from "../../Common/Pagination";
import { useAppDispatch } from "../../../hooks/store";
import BookingsStates from "../../States/BookingsStates";
import { getSingleBookings } from "../../../redux/slices/bookingSlice";
import { getDuties } from "../../../redux/slices/duties";

const SingleBookingsTable = () => {
  const { duties, dutiesState, pagination, filters } = useSelector(
    (state: RootState) => state.duties
  );

  const dispatch = useAppDispatch();

  function returnItems(row: any) {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div onClick={() => {}}>
            <Space>
              <EyeOutlined />
              View Duty
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
          <div onClick={() => {}}>
            <Space>
              <EditOutlined twoToneColor="#52c41a" />
              Edit Duty
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
          <div onClick={() => {}}>
            <Space>
              <CarOutlined />
              Allot vehicle and driver
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
              <RedoOutlined />
              Un confirm Duty
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
              Cancel Duty
            </Space>
          </div>
        ),
      },
    ];
    return items;
  }

  const columns: TableColumnsType<any> = [
    {
      title: "Duties date",
      dataIndex: "dutiesDate",
      key: "dutiesDate",
    },
    {
      title: "Custom booking Id",
      dataIndex: "customBookingId",
      key: "customBookingId",
      render: (data, each) => {
        return <a href={`${RouteName.BOOKINGS}/${each.id}`}>{data}</a>;
      },
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
      width: "200px",
      render: (each: any) => {
        return (
          <div>
            <p>
              <UserOutlined /> {each.name}
            </p>
            <p>
              <PhoneOutlined /> {each.phoneNumber}
            </p>
            <p>
              <MailOutlined /> {each.email}
            </p>
          </div>
        );
      },
    },
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
      dataIndex: "vehicleGroup",
      key: "vehicleGroup",
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
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (data) => {
        return (
          <>
            <a href={data?.dropAddress} target="_blank">
              <PushpinOutlined /> Drop address
            </a>
            <br />
            <a href={data?.reportingAddress} target="_blank">
              <PushpinOutlined /> Reporting address
            </a>
          </>
        );
      },
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
        return <BookingsStates status={data.toLowerCase()} />;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (data: any, row: any) => {
        return (
          <div className={styles.columnsAction}>
            <Dropdown menu={{ items: returnItems(row) }}>
              <MoreOutlined />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  function formateData() {
    return duties?.map((each: any) => {
      return {
        ...each,
        dutiesDate: each.startDate ?? "28/10/2024",
        customerId: each.customerId ?? "Pratham",
        driver: each.driver ?? "John Dukes",
        repTime: each.repRime ?? "16:00",
        address: {
          dropAddress: each?.dropAddress,
          reportingAddress: each?.reportingAddress,
        },
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

  useEffect(() => {
    dispatch(getDuties({ ...filters }));
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
          loading={dutiesState.loading}
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
                  getSingleBookings({
                    search: filters.search,
                    page: page,
                  })
                );
              }}
            />
          )}
        />
      </div>
    </>
  );
};

export default SingleBookingsTable;
