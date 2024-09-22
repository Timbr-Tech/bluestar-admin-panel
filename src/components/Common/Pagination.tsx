/* eslint-disable */

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Pagination, PaginationProps } from "antd";
import React from "react";

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <Button>
        <ArrowLeftOutlined /> Previous
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button>
        Next <ArrowRightOutlined />
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
