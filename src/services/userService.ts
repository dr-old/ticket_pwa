import { instance } from "./api";

interface Person {
  _id: string;
  fullname: string;
  birthday: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
  user: Person;
}

interface SignUpResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  console.log(credentials);

  const response = await instance.post(`/login`, credentials);
  return response.data;
};

export const signUp = async (credentials: {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<SignUpResponse> => {
  const data = {
    fullname: credentials.fullname,
    email: credentials.email,
    password: credentials.password,
  };
  const response = await instance.post(`/register`, data);
  return response.data;
};
