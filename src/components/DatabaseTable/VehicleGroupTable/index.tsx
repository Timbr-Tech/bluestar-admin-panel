/* eslint-disable */
import { VEHICLE_GROUPS } from "../../../constants/database";
import { Table } from "antd";
import { ReactComponent as DeleteIcon } from "../../../icons/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import DeleteModal from "../../Modals/DeleteModal";
import { getVehicleGroup } from "../../../redux/slices/databaseSlice";
import type { TableProps } from "antd";
import React, { useEffect, useState } from "react";

interface IVehicleGroupTableData {
  key: React.Key;
  name: string;
  vehicleCount: number;
}

const VehicleGroupTable = () => {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { vehicleGroupData } = useAppSelector((state) => state.database);

  const columns: TableProps<IVehicleGroupTableData>["columns"] = [
    ...VEHICLE_GROUPS,
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button onClick={() => setOpenDeleteModal(true)}>
          <DeleteIcon />
        </button>
      ),
    },
  ];

  const data: IVehicleGroupTableData[] = [
    {
      key: "1",
      name: "Toyota Innova",
      vehicleCount: 3,
    },
    {
      key: "2",
      name: "Nissan Hatchbacks",
      vehicleCount: 4,
    },
    {
      key: "3",
      name: "MG Hector/MG Titan ",
      vehicleCount: 9,
    },
    {
      key: "4",
      name: "Toyota Sedans",
      vehicleCount: 3,
    },
    {
      key: "5",
      name: "Toyota Innova",
      vehicleCount: 4,
    },
    {
      key: "6",
      name: "Toyota Innova",
      vehicleCount: 9,
    },
  ];

  useEffect(() => {
    dispatch(getVehicleGroup({ page: "1" }));
  }, []);

  console.log(vehicleGroupData, "vehicleGroupData");

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IVehicleGroupTableData[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: onChange,
        }}
        columns={columns}
        dataSource={data}
      />
      {openDeleteModal && (
        <DeleteModal
          primaryText={"Delete vehicle group"}
          secondaryText={
            "Are you sure you want to delete this vehicle group? This action cannot be undone."
          }
        />
      )}
    </>
  );
};

export default VehicleGroupTable;
