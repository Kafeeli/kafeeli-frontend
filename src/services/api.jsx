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

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/backend";

console.log("API BASE URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة الـ token تلقائياً لكل request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("🔑 INTERCEPTOR:", token ? "TOKEN EXISTS" : "NO TOKEN", "→", config.url);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;