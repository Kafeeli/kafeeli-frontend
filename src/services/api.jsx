// // services/authApi.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// export default api
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/backend";

// console.log("API BASE URL:", API_BASE_URL);

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/backend";

// console.log("API BASE URL:", API_BASE_URL);

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// إضافة الـ token تلقائياً لكل request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // نفس الاسم يلي شفناه بـ localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/backend";

// console.log("API BASE URL:", API_BASE_URL);

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // إضافة الـ token تلقائياً لكل request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   // console.log("🔑 INTERCEPTOR:", token ? "TOKEN EXISTS" : "NO TOKEN", "→", config.url);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from "axios";
import { clearSessionStorage } from "../utils/session";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/backend";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة الـ token تلقائياً لكل request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// تجديد التوكن تلقائيًا عند 401
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}

function clearSessionAndRedirect() {
  clearSessionStorage();
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("refresh-token") &&
      !originalRequest.url?.includes("login")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh-token`,
          { refreshToken }
        );

        const data = refreshResponse.data?.data;

        if (!data?.accessToken || !data?.refreshToken) {
          throw new Error("Invalid refresh response");
        }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearSessionAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
