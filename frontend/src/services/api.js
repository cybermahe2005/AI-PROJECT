import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// API call to generate template
export const generateTemplate = (data) => {
  return API.post("/api/generate-template", data);
};
