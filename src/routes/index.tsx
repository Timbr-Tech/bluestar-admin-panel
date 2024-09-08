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
import VehicleExpense from "../pages/VehicleExpense";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RouteName.HOME} element={<Home />} />
      <Route path={`${RouteName.DATABASE}/:tabId`} element={<Database />} />
      <Route path={RouteName.BOOKINGS} element={<Bookings />} />
      <Route path={RouteName.AVAILABILITY} element={<Availability />} />
      <Route path={RouteName.VEHICLE_EXPENSE} element={<VehicleExpense />} />
      <Route path={RouteName.DRIVERS} element={<DriversAttendancePayroll />} />
      <Route path={RouteName.DASHBOARD} element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
