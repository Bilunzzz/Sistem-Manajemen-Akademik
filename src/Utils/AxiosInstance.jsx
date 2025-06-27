import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3002", // alamat json-server
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
