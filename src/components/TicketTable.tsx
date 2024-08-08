import React from "react";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { filterTicket, priorityColor, sortLabel } from "../utils/constant";
import ActionMenu from "./ActionMenu";
import Table, { TicketProps } from "./Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTicket, getTickets } from "../services/ticketService";
import { toast } from "react-hot-toast";

const TicketTable: React.FC = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  const { data, error, isLoading } = useQuery<any | undefined, Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: (data: any) => {
      console.log("onSuccess", data);
      toast.success(data.message);
      client.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (error: any) => {
      toast.error("Error creating ticket: " + error.message);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns: ColumnDef<TicketProps>[] = [
    {
      accessorKey: "title",
      header: "Ticket Detail",
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
      cell: (info: any) => (
        <span
          className={`font-medium text-[10px] px-3 py-1 rounded-xl uppercase text-white ${
            priorityColor[info.getValue() as keyof typeof priorityColor]
          }`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      header: " ",
      cell: ({ row }) => <ActionMenu row={row} onDelete={handleDelete} />,
      enableSorting: false, // Disable sorting for the "Action" column
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      title={t("common.allTicket")}
      sortLabel={sortLabel}
      sortValue={filterTicket}
    />
  );
};

export default TicketTable;
