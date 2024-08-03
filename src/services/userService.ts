// api.ts
import axios from "axios";

const BASE_URL = "http://localhost:3012";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface Person {
  _id: string;
  fullname: string;
  birthday: string;
  email: string;
  password: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
}

export const fetchPersons = async (): Promise<Person[]> => {
  const response = await instance.get(`/persons`);
  return response.data.data;
};

export const fetchPersonById = async (id: string): Promise<Person> => {
  const response = await instance.get(`/person/${id}`);
  return response.data.data;
};

export const createPerson = async (
  newPerson: Omit<Person, "_id" | "createdAt" | "updatedAt">
): Promise<Person> => {
  const response = await instance.post(`/person`, newPerson);
  return response.data.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  console.log(credentials);

  const response = await instance.post(`/login`, credentials);
  return response.data;
};
