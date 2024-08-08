import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Card, Container, InputText, Select } from "../../components";
import { createTicket } from "../../services/ticketService";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/useAuth";

interface FormValues {
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
}

const CreateTicket: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

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

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Container title={t("ticket.create")}>
      <Card
        header={t("ticket.createNew")}
        footer={
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-600 font-medium text-white px-4 py-2 rounded-lg w-full md:max-w-44 shadow-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {isSubmitting ? `${t("ticket.creating")}...` : t("ticket.create")}
          </button>
        }>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="title"
                  placeholder="Ticket Title"
                  labelLeft="Title"
                  error={errors.title?.message}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="textarea"
                  id="description"
                  placeholder="Ticket Description"
                  labelLeft="Description"
                  error={errors.description?.message}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="assignedTo"
              control={control}
              defaultValue=""
              rules={{ required: "Assigned To is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="assignedTo"
                  label="Assigned To"
                  options={[
                    { value: "user1", label: "User 1" },
                    { value: "user2", label: "User 2" },
                    { value: "user3", label: "User 3" },
                  ]}
                  error={errors.assignedTo?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 hidden">
            <Controller
              name="createdBy"
              control={control}
              defaultValue={user?._id || ""}
              rules={{ required: "Created By is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="createdBy"
                  placeholder="Created By"
                  labelLeft="Created By"
                  error={errors.createdBy?.message}
                />
              )}
            />
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default CreateTicket;
