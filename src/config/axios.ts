import axios from "axios";

export const clienteAxios = axios.create({
  baseURL: "http://localhost:4000/api",
});
