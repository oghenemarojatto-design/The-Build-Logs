import api from "./api";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  password2: string;
}) => {
  const response = await api.post("/api/register/", data);
  return response.data;
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/api/login/", data);
  return response.data;
};