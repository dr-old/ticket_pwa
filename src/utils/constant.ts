export const baseUrl = "http://localhost:3012/";

export const priorityColor = {
  high: "bg-red-500",
  low: "bg-yellow-500",
  normal: "bg-green-500",
};

export const filterTicket = [
  { title: "None", value: "" },
  { title: "Detail", value: "title" },
  { title: "Customer Name", value: "assignedTo.fullname" },
  { title: "Date", value: "createdAt" },
  { title: "Priority", value: "priority" },
];

export const sortLabel = [
  { title: "None", value: "" },
  { title: "Ascending", value: "asc" },
  { title: "Descending", value: "desc" },
];
