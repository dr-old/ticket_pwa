import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActionMenu,
  Button,
  Container,
  ModalAlert,
  ModalFormTicket,
  Table,
} from "../../components";
import { useTranslation } from "react-i18next";
import { deleteTicket, getTickets } from "../../services/ticketService";
import { toast } from "react-hot-toast";
import { filterTicket, sortLabel } from "../../utils/constant";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TicketProps } from "../../components/Table";
import moment from "moment";
import { getUsers } from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const priorityColor = {
  high: "bg-red-500",
  low: "bg-yellow-500",
  normal: "bg-green-500",
};

const Ticket = () => {
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelect, setIsModalSelect] = useState(false);
  const client = useQueryClient();

  const { data, error, isLoading } = useQuery<any | undefined, Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const { data: users } = useQuery<any | undefined, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const ASSIGNED_DATA = useMemo(() => {
    if (!users?.data) return [];
    return users?.data?.map((item: any) => ({
      value: item._id,
      label: item.fullname,
    }));
  }, [users?.data]);

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

  const onDelete = (id: string) => {
    mutation.mutate(id);
  };

  const handleDelete = (ticket: any) => {
    setSelectedRow(ticket);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket: any) => {
    setSelectedRow(ticket);
    setIsModalSelect(true);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setIsModalSelect(true);
  };

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
            <div className="flex flex-col max-w-xs">
              <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap">
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
      cell: ({ row }) => (
        <ActionMenu row={row} onDelete={handleDelete} onEdit={handleEdit} />
      ),
      enableSorting: false,
    },
  ];

  return (
    <Container title={t("common.ticket")} loading={isLoading}>
      <div className="flex-1">
        <Button
          mode="success"
          type="button"
          className="mb-4 max-w-40"
          data-autofocus
          onClick={handleCreate}
          label={t("ticket.create")}
          preffix={
            <FontAwesomeIcon
              icon={faPencil}
              className="h-4 w-4 text-white dark:text-gray-200 mr-3"
            />
          }
        />
        <Table
          data={data?.tickets}
          columns={columns}
          title={t("common.allTicket")}
          sortLabel={sortLabel}
          sortValue={filterTicket}
        />
        {isModalOpen && (
          <ModalAlert
            isOpen={isModalOpen}
            setOpen={setIsModalOpen}
            title="Confirm Deletion"
            message="Are you sure you want to delete this ticket? This action cannot be undone."
            labelConfirm="Delete"
            onConfirm={() => onDelete(selectedRow._id)}
          />
        )}
        {isModalSelect && (
          <ModalFormTicket
            isOpen={isModalSelect}
            setOpen={setIsModalSelect}
            ticketData={selectedRow}
            refetch={client}
            assignedData={ASSIGNED_DATA}
          />
        )}
      </div>
    </Container>
  );
};

export default Ticket;
