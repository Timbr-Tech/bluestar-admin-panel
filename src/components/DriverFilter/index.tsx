/* eslint-disable */
import { ReactComponent as FilterIcon } from "../../icons/filter.svg";
import { Popover, Select } from "antd";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const DriverFilter = () => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    console.log(newOpen, "newOpen");
    setOpen(newOpen);
  };

  useEffect(() => {
    console.log(open, "open");
  }, [open]);

  const PopoverComponent = () => {
    return (
      <div className={styles.container}>
        <Select
          mode="multiple"
          placeholder="Search driver"
          className={styles.select}
          defaultOpen={open}
          open={open}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        />
      </div>
    );
  };

  return (
    <Popover
      content={<PopoverComponent />}
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
