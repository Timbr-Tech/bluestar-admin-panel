/* eslint-disable */
import { Table, TableProps, Dropdown } from "antd";
import cn from "classnames";
import { AVAILABLITY_TABLE } from "../../constants/availability";
import styles from "./index.module.scss";

interface IBooking {
  bookingId: string;
  user: string;
}

interface IDate {
  bookings: IBooking[];
  date: string;
}

interface IAvailability {
  key: string;
  vehicle: { name: string; licensePlate: string };
  dates: IDate[];
}

const data: IAvailability[] = [
  {
    key: "1",
    vehicle: { name: "Toyota Innova", licensePlate: "MH01 4656" },
    dates: [
      {
        bookings: [{ bookingId: "BS32456901", user: "Anshul G." }],
        date: "12th May",
      },
      {
        bookings: [{ bookingId: "BS32456901", user: "Anshul G." }],
        date: "13th May",
      },
      {
        bookings: [{ bookingId: "BS32456901", user: "Anshul G." }],
        date: "14th May",
      },
      {
        bookings: [{ bookingId: "BS32456901", user: "Anshul G." }],
        date: "15th May",
      },
      {
        bookings: [],
        date: "16th May",
      },
      {
        bookings: [],
        date: "17th May",
      },
      {
        bookings: [
          { bookingId: "BS32456901", user: "Anshul G." },
          { bookingId: "BS32452341", user: "Anshul G." },
        ],
        date: "18th May",
      },
      {
        bookings: [
          { bookingId: "BS32456901", user: "Anshul G." },
          { bookingId: "BS32452341", user: "Anshul G." },
        ],
        date: "19th May",
      },
      {
        bookings: [
          { bookingId: "BS32456901", user: "Anshul G." },
          { bookingId: "BS32452341", user: "Anshul G." },
        ],
        date: "20th May",
      },
    ],
  },
  // Add more vehicles and their bookings here...
];

const dates = [
  "12th May",
  "13th May",
  "14th May",
  "15th May",
  "16th May",
  "17th May",
  "18th May",
  "19th May",
  "20th May",
];

const AvailablityTable = () => {
  const columns: TableProps<IAvailability>["columns"] = [
    {
      title: "Vehicle",
      key: "vehicle",
      fixed: "left",
      width: 200,
      className: "available-header",
      render: (record: IAvailability) => {
        return (
          <div className={styles.vehicle}>
            <div className={styles.name}>{record?.vehicle?.name}</div>
            <div className={styles.licensePlate}>
              {record?.vehicle?.licensePlate}
            </div>
          </div>
        );
      },
    },
    // Dynamically create columns based on the dates
    ...dates.map((date) => ({
      title: date,
      key: date,
      width: 200,
      className: "available-date",
      render: (record: IAvailability) => {
        // Find the booking info for the specific date
        const dateInfo = record.dates.find((d) => d.date === date);

        if (!dateInfo || dateInfo.bookings.length === 0) {
          return ""; // No bookings on this date
        }

        return dateInfo.bookings.map((booking, index) => (
          <div
            key={index}
            className={cn(styles.bookingConatiner, {
              [styles.connect]:
                dateInfo.bookings[index]?.bookingId ===
                dateInfo.bookings[index + 1]?.bookingId,
            })}
            aria-describedby={`${index}`}
          >
            <div className={styles.booking}>
              <div className={styles.hash} aria-describedby={`${index}`}>
                {dateInfo.bookings[index]?.bookingId ===
                dateInfo.bookings[index + 1]?.bookingId
                  ? ""
                  : "#"}
              </div>
              <div className={styles.bookingText}>
                {dateInfo.bookings[index]?.bookingId ===
                dateInfo.bookings[index + 1]?.bookingId
                  ? ""
                  : `${booking.bookingId}`}
              </div>
            </div>
            <div className={styles.text}>
              {dateInfo.bookings[index]?.bookingId ===
              dateInfo.bookings[index + 1]?.bookingId
                ? ""
                : `${booking.user}`}
            </div>
          </div>
        ));
      },
    })),
  ];

  console.log(data, "data");

  return (
    <Table
      bordered
      rowClassName={styles.rowstyles}
      columns={columns}
      dataSource={data}
      scroll={{
        x: "max-content", // Horizontal scroll for wide tables
      }}
      pagination={false}
    />
  );
};

export default AvailablityTable;
