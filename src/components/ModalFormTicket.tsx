import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEdit,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Textarea, Radio, SelectOption, Form } from ".";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createTicket, updateTicket } from "../services/ticketService";
import { useAuth } from "../context/useAuth";
import { useTranslation } from "react-i18next";
import { priorityTicket } from "../utils/constant";

interface ModalFormTicketProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ticketData?: any;
  refetch?: any;
  assignedData?: any;
}

const ModalFormTicket: React.FC<ModalFormTicketProps> = ({
  isOpen,
  setOpen,
  ticketData,
  refetch,
  assignedData,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(Boolean);

  const mutation = useMutation({
    mutationFn: ticketData?._id ? updateTicket : createTicket,
    onSuccess: (data) => {
      console.log("data", data);

      toast.success("Ticket updated successfully!");
      refetch.invalidateQueries({ queryKey: ["tickets"] });
      setOpen(false);
    },
    onError: (error: any) => {
      console.log("Error ticket: " + error);
      toast.error(error.message);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      data: {
        ...data,
        status: "open",
        updatedBy: user?._id,
        createdBy: user?._id,
      },
    });
  };

  const onUpdate = (data: any) => {
    mutation.mutate({
      data: {
        ...data,
        status: ticketData.status,
        updatedBy: user?._id,
        updatedAt: new Date(),
      },
      id: ticketData?._id,
    });
  };

  const labelConfirm = ticketData?._id
    ? t("common.update")
    : t("common.create");
  const labelLoading = ticketData?._id
    ? t("ticket.updating")
    : t("ticket.creating");

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-black dark:bg-opacity-75" />

      <div className="fixed inset-0 z-10 w-screen h-screen">
        <div className="flex md:min-h-full items-end justify-center text-center md:items-center p-4">
          <DialogPanel className="relative transform overflow-hidden bg-white dark:bg-gray-800 rounded-xl text-left shadow-xl transition-all lg:my-8 w-full md:max-w-lg">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                    ticketData?._id
                      ? "bg-blue-100 dark:bg-blue-200"
                      : "bg-green-100 dark:bg-green-200"
                  } sm:mx-0 sm:h-10 sm:w-10`}>
                  {ticketData?._id ? (
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="h-4 w-4 text-blue-600 dark:text-blue-700"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="h-4 w-4 text-green-600 dark:text-green-700"
                    />
                  )}
                </div>
                <DialogTitle
                  as="h3"
                  className="flex-1 font-semibold text-gray-900 dark:text-gray-200 mt-3 sm:mt-0 sm:ml-3">
                  <span>
                    {ticketData?._id ? t("ticket.update") : t("ticket.create")}
                  </span>
                </DialogTitle>
              </div>

              <div className="flex-1 mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left">
                <Form
                  title={t("ticket.createNew")}
                  className=""
                  defaultValues={{
                    title: ticketData?.title || "",
                    assignedTo: ticketData?.assignedTo?._id || "",
                    description: ticketData?.description || "",
                    priority: ticketData?.priority || "",
                  }}
                  onSubmit={ticketData?._id ? onUpdate : onSubmit}>
                  <Input
                    name="title"
                    placeholder="Your ticket title"
                    rules={{ required: "This title is required" }}
                    className="px-4 sm:px-6"
                  />
                  <Textarea
                    name="description"
                    placeholder="Your ticket description"
                    rules={{ required: "This description is required" }}
                    className="px-4 sm:px-6"
                  />
                  <SelectOption
                    name="assignedTo"
                    placeholder="Select your assigned to"
                    type={2}
                    options={assignedData}
                    rules={{ required: "Please select an option" }}
                    className="px-4 sm:px-6"
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
                    className="px-4 sm:px-6"
                    options={priorityTicket}
                  />
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 mt-8 flex flex-col sm:flex-row-reverse sm:px-6 sm:gap-y-3">
                    <Button
                      mode={ticketData?._id ? "primary" : "success"}
                      disabled={loading}
                      label={loading ? labelLoading : labelConfirm}
                    />
                    <div className="h-3 w-3" />
                    <Button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      label={t("common.cancel")}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalFormTicket;
