/* eslint-disable */
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import "./styles/index.scss";
import { ConfigProvider } from "antd";

function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7F56D9",
          },
        }}
      >
        <div className="App">
          <Sidebar />
          <Routes />
        </div>
      </ConfigProvider>
    </Router>
  );
}

export default App;
