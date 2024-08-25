export const DATABASE_ITEMS = [
  {
    id: 1,
    name: "Duty types",
    type: "duty_types",
    text: "Create and manage your duty types here",
  },
  {
    id: 2,
    name: "Vehicle groups",
    type: "vehicle_groups",
    text: "Create and manage your vehicle groups here",
  },
  {
    id: 3,
    name: "Customers",
    type: "customers",
    text: "Create and manage your customers here",
  },
  {
    id: 4,
    name: "Drivers",
    type: "drivers",
    text: "Manage your drivers and their activity here.",
  },
  {
    id: 5,
    name: "Vehicles",
    type: "vehicles",
    text: "Create and manage your vehicle data here",
  },
  {
    id: 6,
    name: "Bank accounts",
    type: "bank_accounts",
    text: "Create and manage your bank accounts here",
  },
  {
    id: 7,
    name: "Taxes",
    type: "taxes",
    text: "Create and manage your tax data here",
  },
  {
    id: 8,
    name: "Allowances",
    type: "allowances",
    text: "Create and manage driver allowance here",
  },
  {
    id: 9,
    name: "FASTag",
    type: "fastag",
    text: "Repository of all your FASTag details",
  },
];

export const DUTY_TYPES = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Max. Kilometers",
    dataIndex: "max_kilometers",
  },
  {
    title: "Max. Hours",
    dataIndex: "max_hours",
  },
];

export const VEHICLE_GROUPS = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Total vehicles",
    dataIndex: "total_vehicles",
  },
];

export const CUSTOMERS = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Group name",
    dataIndex: "group_name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "GSTIN number",
    dataIndex: "gstin_number",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

export const DRIVERS = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Driver ID",
    dataIndex: "driverId",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

export const VEHICLES = [
  {
    title: "Model name",
    dataIndex: "model_name",
  },
  {
    title: "Group",
    dataIndex: "group",
  },
  {
    title: "Assigned driver",
    dataIndex: "assigned_driver",
  },
  {
    title: "Vehicle number",
    dataIndex: "vehicle_number",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

export const BANK_ACCOUNTS = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Group",
    dataIndex: "group",
  },
  {
    title: "Assigned driver",
    dataIndex: "assigned_driver",
  },
  {
    title: "Vehicle number",
    dataIndex: "vehicle_number",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

export const DUTY_TYPES_TYPE = [
  {
    value: "1",
    label: "Day - KM( Outstation)",
  },
  {
    value: "2",
    label: "HR - KM(Local)",
  },
  {
    value: "3",
    label: "Long Duration - Total KM Daily HR( Monthly Bookings)",
  },
  { value: "4", label: "Flat Rate" },
  { value: "5", label: "Long Duration - Total KM & HR( Monthly Bookings)" },
];

export const FASTTAG_TABLE = [
  {
    title: "Tag Account",
    dataIndex: "tag_account",
  },
  {
    title: "License Plate No.",
    dataIndex: "license_plate",
  },
  {
    title: "Total Trips till month",
    dataIndex: "total_trips",
  },
  {
    title: "Total Cost incurred this month",
    dataIndex: "total_cost",
  },
];

export const STATES = [
  {
    value: "tel",
    label: "Telangana",
  },
  { value: "ncr", label: "NCR" },
  { value: "pun", label: "Punjab" },
  { value: "hp", label: "Himachal Pradesh" },
  { value: "hr", label: "Haryana" },
];

export const ADDRESS_TYPE = [
  {
    value: "permanent",
    label: "Permanent Address",
  },
  {
    value: "temporary",
    label: "Temporary Address",
  },
];

export const CUSTOMER_TAX_TYPES = [
  {
    value: "business",
    label: "Business",
  },
  {
    value: "self-employed",
    label: "Self Employed",
  },
  { value: "job", label: "Job" },
];

export const ALLOWANCES_TYPES = [
  {
    value: "dailyAllowance",
    label: "Daily Allowance",
  },
  {
    value: "overtimeAllowance",
    label: "Overtime Allowance",
  },
  {
    value: "outstationAllowance",
    label: "Outstation Allowance",
  },
  {
    value: "outstationOvernightAllowance",
    label: "Outstation Overnight Allowance",
  },
  {
    value: "offDayAllowance",
    label: "Off-Day Allowance",
  },
  {
    value: "earlyStartAllowance",
    label: "Early Start Allowance",
  },
  {
    value: "nightAllowance",
    label: "Night Allowance",
  },
  {
    value: "extraDutyAllowance",
    label: "Extra Duty Allowance",
  },
  {
    value: "airportAllowance",
    label: "Airport Allowance",
  },
];

export const Allowance = (value: string) => {
  switch (value) {
    case "dailyAllowance":
      return "Automatically included in the driver's salary for each day of duty, this allowance compensates for regular daily service provided.";
    case "overtimeAllowance":
      return "This allowance is provided on an hourly basis when a driver works beyond the standard number of designated hours, ensuring fair compensation for additional time spent on duty.";
    case "outstationAllowance":
      return "Automatically applied when a driver’s duty requires travel beyond the standard operating area, this allowance compensates for the additional responsibilities and time associated with outstation duties.";
    case "outstationOvernightAllowance":
      return "This allowance is automatically included if an outstation duty extends overnight, covering the driver's time and expenses for duties that require an overnight stay.";
    case "offDayAllowance":
      return "Awarded when a driver is required to work on their designated off day, this allowance ensures they are compensated for their additional commitment.";
    case "earlyStartAllowance":
      return "Provided on an hourly basis, this allowance compensates drivers who begin their duties earlier than their scheduled start time.";
    case "nightAllowance":
      return "Applied for duties that extend beyond a single day, this allowance compensates for the extended service hours and the overnight commitment required from the driver.";
    case "extraDutyAllowance":
      return "This allowance is awarded when a driver performs more than one duty within a single day. Each additional duty qualifies the driver for an additional allowance.";
    case "airportAllowance":
      return "Specifically added for duties that involve trips to the airport, this allowance compensates for the specific requirements and responsibilities associated with airport-related duties.";
    default:
      return null;
  }
};

export const FuelType = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
];
