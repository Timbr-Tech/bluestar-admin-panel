import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteName } from "../constants/routes";

//Page Components
import Home from "../pages/Home";
import Database from "../pages/Database";
import Bookings from "../pages/Bookings";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={RouteName.HOME} Component={Home} />
        <Route path={RouteName.DATABASE} Component={Database} />
        <Route path={RouteName.BILLINGS} Component={Bookings} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
