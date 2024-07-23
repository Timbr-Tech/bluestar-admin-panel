/* eslint-disable */
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import "./styles/index.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
