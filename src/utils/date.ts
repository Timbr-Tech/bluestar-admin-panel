/* eslint-disable */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

/**
 * Convert ISO date to "DD-MM-YYYY" format
 */
export const formatDateDMY = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    return dayjs(isoDate).format("DD-MM-YYYY");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Convert ISO date to "MMMM D, YYYY" format (e.g., "September 2, 2024")
 */
export const formatDateFull = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    return dayjs(isoDate).format("D MMMM, YYYY");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Convert ISO date to "hh:mm A" format (12-hour with AM/PM)
 */
export const formatTime12Hour = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    return dayjs(isoDate).format("hh:mm A");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Convert ISO date to "HH:mm" format (24-hour time)
 */
export const formatTime24Hour = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    return dayjs(isoDate).format("HH:mm");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Convert ISO date to relative time with custom thresholds
 */
export const formatRelativeTime = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    const date = dayjs(isoDate);
    const now = dayjs();
    const diffHours = now.diff(date, "hour");
    const diffDays = now.diff(date, "day");

    // If less than 24 hours, show relative time
    if (diffHours < 24) {
      return date.fromNow();
    }
    // If less than 7 days, show day of week and time
    else if (diffDays < 7) {
      return date.format("dddd [at] hh:mm A");
    }
    // If this year, show month and day
    else if (date.year() === now.year()) {
      return date.format("D MMMM [at] hh:mm A");
    }
    // Otherwise show full date
    return date.format("D MMMM, YYYY [at] hh:mm A");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Convert ISO date to full date and time with smart formatting
 */
export const formatFullDateTime = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    const date = dayjs(isoDate);
    const now = dayjs();

    // If today, show "Today at HH:mm"
    if (date.isSame(now, "day")) {
      return `Today at ${date.format("hh:mm A")}`;
    }
    // If yesterday, show "Yesterday at HH:mm"
    if (date.isSame(now.subtract(1, "day"), "day")) {
      return `Yesterday at ${date.format("hh:mm A")}`;
    }
    // If this year, omit year
    if (date.year() === now.year()) {
      return date.format("MMMM D [at] hh:mm A");
    }
    // Full date and time for older dates
    return date.format("MMMM D, YYYY [at] hh:mm A");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Get calendar date (useful for scheduling/planning)
 */
export const formatCalendarDate = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    const date = dayjs(isoDate);
    const now = dayjs();

    if (date.isSame(now, "day")) {
      return "Today";
    }
    if (date.isSame(now.add(1, "day"), "day")) {
      return "Tomorrow";
    }
    if (date.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    }
    if (date.isSame(now, "week")) {
      return date.format("dddd");
    }
    if (date.year() === now.year()) {
      return date.format("D MMMM");
    }
    return date.format("D MMMM, YYYY");
  } catch (error) {
    return isoDate;
  }
};

/**
 * Format duration from now (e.g., "2 hours left" or "3 days overdue")
 */
export const formatDurationFromNow = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    const date = dayjs(isoDate);
    const now = dayjs();

    if (date.isAfter(now)) {
      return `${date.fromNow(true)} left`;
    } else {
      return `${date.fromNow(true)} overdue`;
    }
  } catch (error) {
    return isoDate;
  }
};
