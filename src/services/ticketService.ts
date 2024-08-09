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
  priority: string;
}): Promise<TicketResponse> => {
  const data = {
    ...credentials,
    status: "open",
  };
  console.log("status", data);

  const response = await instance.post(`/ticket`, data);
  return response.data;
};

export const getTickets = async () => {
  const response = await instance.get(`/ticket`);
  return response.data?.data;
};

export const deleteTicket = async (id: string) => {
  const response = await instance.delete(`/ticket/${id}`);
  return response.data;
};
