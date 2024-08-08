import { useAuth } from "../../context/useAuth";
import { Container } from "../../components";
import { Button, Form, Input, SelectOption } from "../../components/Form";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTicket } from "../../services/ticketService";
import { toast } from "react-hot-toast";
import { getUsers } from "../../services/userService";

const MyForm: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { data, error, isLoading } = useQuery<any | undefined, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      toast.success("Ticket created successfully!");
    },
    onError: (error: any) => {
      toast.error("Error creating ticket: " + error.message);
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const ASSIGNED_DATA = useMemo(
    () =>
      data?.data
        ? data?.data?.map((item: any) => ({
            value: item._id,
            label: item.fullname,
          }))
        : [],
    [data?.data]
  );

  return (
    <Container title={t("ticket.create")} loading={isLoading}>
      <Form
        title={t("ticket.createNew")}
        defaultValues={{ title: "", assignedTo: "" }}
        onSubmit={onSubmit}
        card={true}
        footer={
          <Button
            disabled={isSubmitting}
            label={
              isSubmitting ? `${t("ticket.creating")}...` : t("ticket.create")
            }
          />
        }>
        <Input
          name="title"
          placeholder="Your ticket title"
          rules={{ required: "This field is required" }}
        />
        <SelectOption
          name="assignedTo"
          placeholder="Your ticket title"
          type={2}
          options={ASSIGNED_DATA}
          rules={{ required: "Please select an option" }}
        />
      </Form>
    </Container>
  );
};

export default MyForm;
