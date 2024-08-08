import { Container, TicketTable } from "../components";
import { useTranslation } from "react-i18next";

const Ticket = () => {
  const { t } = useTranslation();

  return (
    <Container title={t("common.ticket")}>
      <div className="flex">
        <TicketTable />
      </div>
    </Container>
  );
};

export default Ticket;
