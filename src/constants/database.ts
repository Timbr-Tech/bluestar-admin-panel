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
