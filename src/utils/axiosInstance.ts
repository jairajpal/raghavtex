import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

export default axiosInstance;
