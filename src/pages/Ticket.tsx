import { Container } from "../components";
import TicketTable from "../components/TicketTable";

const Ticket = () => {
  return (
    <Container title="Tickets">
      <div className="flex">
        <TicketTable />
      </div>
    </Container>
  );
};

export default Ticket;
