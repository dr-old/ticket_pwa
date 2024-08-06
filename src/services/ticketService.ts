import { instance } from "./api";

interface TicketResponse {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createTicket = async (credentials: {
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
}): Promise<TicketResponse> => {
  const data = {
    ...credentials,
    status: "open",
  };

  const response = await instance.post(`/ticket`, data);
  return response.data;
};
