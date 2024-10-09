// Creating an Axios instance allows you to make HTTP requests with pre-configured settings,
// eliminating the need to repeatedly configure request settings for each  API call.
// For example, you can set default values for your request headers, authentication tokens,
// base URLs, and request and response interceptors.
// This centralizes your HTTP requests and makes it easier to work with multiple APIs

import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
