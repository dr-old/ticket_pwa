import { useAuth } from "../../context/useAuth";
import { Container } from "../../components";
import {
  Button,
  Form,
  Input,
  Radio,
  SelectOption,
  Textarea,
} from "../../components/Form";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTicket } from "../../services/ticketService";
import { toast } from "react-hot-toast";
import { getUsers } from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

  const ASSIGNED_DATA = useMemo(() => {
    if (!data?.data) return [];
    return data?.data?.map((item: any) => ({
      value: item._id,
      label: item.fullname,
    }));
  }, [data?.data]);

  return (
    <Container title={t("ticket.create")} loading={isLoading}>
      <Form
        title={t("ticket.createNew")}
        defaultValues={{
          title: "",
          assignedTo: "",
          description: "",
          priority: "",
          createdBy: user?._id,
        }}
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
          rules={{ required: "This title is required" }}
        />
        <Textarea
          name="description"
          placeholder="Your ticket description"
          rules={{ required: "This description is required" }}
        />
        <SelectOption
          name="assignedTo"
          placeholder="Select your assigned to"
          type={2}
          options={ASSIGNED_DATA}
          rules={{ required: "Please select an option" }}
          iconSuffix={
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 text-gray-500 dark:text-gray-400"
            />
          }
        />
        <Radio
          name="priority"
          rules={{ required: "Please select an priority" }}
          options={[
            { value: "low", label: "Low" },
            { value: "normal", label: "Normal" },
            { value: "high", label: "High" },
          ]}
        />
      </Form>
    </Container>
  );
};

export default MyForm;
