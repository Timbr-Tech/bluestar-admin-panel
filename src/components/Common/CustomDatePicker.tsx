/* eslint-disable */
import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const CustomDatePicker = ({
  value,
  onChange,
  format = "DD-MM-YYYY",
  disabledDate,
  ...rest
}: any) => {
  const handleChange = (date: any, dateString: any) => {
    if (onChange) {
      if (!date) {
        console.error("Invalid date selected");
        onChange(undefined);
      } else {
        // Ensure date is a valid Day.js object
        console.error("Invalid date selected 1");
        const dayjsDate = dayjs(date);

        if (dayjsDate?.isValid()) {
          console.error("Invalid date selected 2");
          // Use the timezone function
          console.log("dayjsDate:", dayjsDate);
          const indiaDate = dayjsDate.tz("Asia/Kolkata"); // Apply timezone
          onChange(indiaDate.toISOString());
        } else {
          console.error("Invalid date selected");
          console.error("Invalid date selected 3");
          onChange(undefined);
        }
      }
    }
  };

  return (
    <AntDatePicker
      {...rest}
      value={value ? dayjs(value) : dayjs()}
      onChange={handleChange}
      format={format}
      disabledDate={disabledDate}
      style={{ width: "100%", ...rest.style }}
    />
  );
};

export default CustomDatePicker;
