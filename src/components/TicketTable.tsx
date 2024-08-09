import React, { useState } from "react";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { filterTicket, sortLabel } from "../utils/constant";
import Table, { TicketProps } from "./Table";
import ActionMenu from "./ActionMenu";

interface TicketTableProps {
  data: any;
  onDelete: (id: string) => void;
}

const priorityColor = {
  high: "bg-red-500",
  low: "bg-yellow-500",
  normal: "bg-green-500",
};

const TicketTable: React.FC<TicketTableProps> = ({ data, onDelete }) => {
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const columns: ColumnDef<TicketProps>[] = [
    {
      accessorKey: "title",
      header: "Ticket Detail",
      enableSorting: false,
      cell: (info: any) => {
        return (
          <div className="flex flex-row items-center">
            <img
              src={
                info.row.original.assignedTo?.photo ||
                `https://i.pravatar.cc/150?img=${info.row.index + 1}`
              }
              alt="User"
              className="w-8 h-8 object-cover rounded-full mr-4"
            />
            <div className="flex flex-col">
              <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
                {info.row.original.title}
              </span>
              <span className="text-[10px] text-gray-300 dark:text-gray-500">
                Updated {moment(info.row.original.updatedAt).fromNow()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      enableSorting: false,
      cell: (info: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
            {info.row.original.assignedTo?.fullname}
          </span>
          <span className="text-[10px] text-gray-300 dark:text-gray-500">
            On{" "}
            {moment(info.row.original.assignedTo?.createdAt).format(
              "MMMM D, YYYY"
            )}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      enableSorting: false,
      cell: (info: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
            {moment(info.getValue()).format("MMMM D, YYYY")}
          </span>
          <span className="text-[10px] text-gray-300 dark:text-gray-500">
            {moment(info.getValue()).format("h:mm A")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      enableSorting: false,
      cell: (info: any) => {
        console.log(
          priorityColor[
            info.row.original.priority as keyof typeof priorityColor
          ]
        );

        return (
          <span
            className={`font-medium text-[10px] px-3 py-1 rounded-xl uppercase text-white ${
              priorityColor[
                info.row.original.priority as keyof typeof priorityColor
              ]
            }`}>
            {info.row.original.priority}
          </span>
        );
      },
    },
    {
      header: " ",
      cell: ({ row }) => <ActionMenu row={row} onDelete={onDelete} />,
      enableSorting: false,
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      title={t("common.allTicket")}
      sortLabel={sortLabel}
      sortValue={filterTicket}
      selectedRow={selectedRow}
    />
  );
};

export default TicketTable;
