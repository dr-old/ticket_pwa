import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Container, InputText } from "../../components";
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
      <div className="flex font-poppins">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md dark:bg-gray-900 p-8 rounded-xl w-full max-w-md text-gray-600 dark:text-gray-400">
          <h1 className="text-xl mb-5 font-semibold text-center text-gray-900 dark:text-gray-100">
            {t("ticket.createNew")}
          </h1>
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
                  placeholder="Ticket description"
                  labelLeft="description"
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
              rules={{ required: "Assigned is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="assignedTo"
                  placeholder="Select assigned"
                  labelLeft="Assigned To"
                  error={errors.assignedTo?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 hidden">
            <Controller
              name="createdBy"
              control={control}
              defaultValue={user?._id}
              rules={{ required: "Created by is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="createdBy"
                  placeholder="created By"
                  labelLeft="Created By"
                  error={errors.createdBy?.message}
                />
              )}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-600 mt-7 font-medium text-white px-4 py-2 rounded-lg w-full shadow-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {isSubmitting ? `${t("ticket.creating")}...` : t("ticket.create")}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateTicket;
