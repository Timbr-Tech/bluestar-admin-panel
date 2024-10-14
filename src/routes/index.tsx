/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../constants/routes";

//Page Components
import Availability from "../pages/Availability";
import Dashboard from "../pages/Dashboard";
import DriversAttendancePayroll from "../pages/DriversAttendancePayroll";
import Home from "../pages/Home";
import Database from "../pages/Database";
import Bookings from "../pages/Bookings";
import Billings from "../pages/Billings";
import CreateBilling from "../pages/Billings/Create";
import VehicleExpense from "../pages/VehicleExpense";
import SingleBookings from "../pages/Bookings/SingleBooking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RouteName.HOME} element={<Dashboard />} />
      <Route path={`${RouteName.DATABASE}/:tabId`} element={<Database />} />
      <Route path={`${RouteName.DATABASE}/:tabId/:id`} element={<Database />} />
      <Route path={RouteName.BOOKINGS} element={<Bookings />} />
      <Route
        path={`${RouteName.BOOKINGS}/:bookingId`}
        element={<SingleBookings />}
      />
      <Route path={RouteName.BILLINGS} element={<Billings />} />
      <Route path={RouteName.CREATE_BOOKINGS} element={<CreateBilling />} />
      <Route path={RouteName.AVAILABILITY} element={<Availability />} />
      <Route path={RouteName.VEHICLE_EXPENSE} element={<VehicleExpense />} />
      <Route path={RouteName.DRIVERS} element={<DriversAttendancePayroll />} />
    </Routes>
  );
};

export default AppRoutes;
