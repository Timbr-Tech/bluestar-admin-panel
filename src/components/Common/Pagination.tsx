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
const CustomPagination = ({ total, page, limit }: any) => {
  return (
    <Pagination
      total={total ?? 0}
      current={page ?? 1}
      pageSize={limit ?? 10}
      align="center"
      itemRender={itemRender}
      className="custom-pagination"
      onChange={(page) => {
        console.log(page);
      }}
    />
  );
};

export default CustomPagination;
