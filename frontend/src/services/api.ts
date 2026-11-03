import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://the-build-logs.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const method = config.method?.toLowerCase();
    const url = config.url || "";

    const isAuthRequest =
      url.includes("/api/login/") ||
      url.includes("/api/register/");

    const isPublicRequest =
      method === "get" &&
      (
        /^\/posts\/?$/.test(url) ||
        /^\/posts\/\d+\/?$/.test(url) ||
        /^\/posts\/\d+\/comments\/?$/.test(url)
      );

    if (token && !isAuthRequest && !isPublicRequest) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
