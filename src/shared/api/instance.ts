import axios from "axios";

export const http = axios.create({
  baseURL: `/api`,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
  if (!config.headers.Authorization && token)
    config.headers.Authorization = `Bearer ${token}`;
  if (!config.headers.accept) config.headers.accept = "*/*";
  if (!config.headers["Content-Type"])
    config.headers["Content-Type"] = "application/json*";
  if (!config.headers["Access-Control-Allow-Origin"])
    config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
