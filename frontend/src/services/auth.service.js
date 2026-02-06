import axios from "axios";

export const registerUser = (data) => {
  return axios.post("/api/auth/register", data);
};

export const loginUser = (data) => {
  return axios.post("/api/auth/login", data);
};