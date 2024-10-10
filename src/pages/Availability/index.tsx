/* eslint-disable */
import cn from "classnames";
import { Input, DatePicker } from "antd";
import AvailablityTable from "../../components/AvailablityTable";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const Availability = () => {
  const { RangePicker } = DatePicker;

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Vehicle Availability</div>
        <div className={styles.text}>
          View your vehicles and their drivers availability here
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          <Input
            prefix={<SearchOutlined />}
            defaultValue={""}
            className={styles.inputContainer}
            placeholder="Search by vehicle or driver"
          />
          <div
            className="flex"
            style={{
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <RangePicker />
            <button className={styles.clearText}>Clear</button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <AvailablityTable />
        </div>
      </div>
    </div>
  );
};

export default Availability;
