import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5248/api", // tu backend .NET
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token en cada request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;