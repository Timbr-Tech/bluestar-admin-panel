/* eslint-disable */
import { ReactComponent as FilterIcon } from "../../icons/filter.svg";
import { Popover } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";

const DriverFilter = () => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const popoverComponent = () => {
    return <div className={styles.container}></div>;
  };

  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      arrow={false}
      placement={"bottomRight"}
    >
      <div className={styles.filter}>
        <FilterIcon />
        <div className={styles.text}>{"Filter driver"}</div>
      </div>
    </Popover>
  );
};

export default DriverFilter;
