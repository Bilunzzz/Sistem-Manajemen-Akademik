import axios from "axios";

// Determine base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // Development mode - use json-server
    return "http://localhost:3002";
  } else {
    // Production mode - use Vercel API
    return "/api";
  }
};

const AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
