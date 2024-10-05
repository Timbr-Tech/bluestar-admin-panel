/* eslint-disable */

import { ReactComponent as ArrowLeft } from "../../icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../icons/arrow-right.svg";
import { Button, Pagination, PaginationProps } from "antd";
import styles from "./index.module.scss";
import React from "react";

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <Button className={styles.button}>
        <ArrowLeft />
        <div>Previous</div>
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button className={styles.button}>
        <div>Next</div> <ArrowRight />
      </Button>
    );
  }
  return originalElement;
};
const CustomPagination = ({ total, page, limit, onPageChange }: any) => {
  return (
    <Pagination
      total={total}
      current={page}
      pageSize={limit}
      align="center"
      itemRender={itemRender}
      className="custom-pagination"
      onChange={(page) => {
        onPageChange(Number(page));
      }}
    />
  );
};

export default CustomPagination;
