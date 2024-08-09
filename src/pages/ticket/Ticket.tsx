import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container, TicketTable } from "../../components";
import { useTranslation } from "react-i18next";
import { deleteTicket, getTickets } from "../../services/ticketService";
import { toast } from "react-hot-toast";

const Ticket = () => {
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

  console.log("data", data);

  return (
    <Container title={t("common.ticket")} loading={isLoading}>
      <div className="flex">
        <TicketTable data={data?.tickets} onDelete={handleDelete} />
      </div>
    </Container>
  );
};

export default Ticket;
