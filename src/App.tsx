/* eslint-disable */
import Routes from "./routes";
import Sidebar from "../src/components/Sidebar";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes />
    </div>
  );
}

export default App;
