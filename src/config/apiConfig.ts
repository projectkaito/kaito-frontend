import axios from "axios";
import { BASE_API_URL, WHITELIST_API_URL } from "./config";

export const apiCall = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export const whiteListApiCall = axios.create({
  baseURL: WHITELIST_API_URL,
  timeout: 100000,
});
