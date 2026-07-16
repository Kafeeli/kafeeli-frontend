// import api from "./api";

// export const authApi = {//here
//   register: async (data) => {
//     const response = await api.post("/api/v1/auth/register", data);
//     return response.data;
//   },
//   login: async (data) => {
//     const response = await api.post("/api/v1/auth/login", data);
//     return response.data;
//   },
//   forgetPassword: async (data) => {
//     const response = await api.post("/api/v1/auth/forgot-password", data);
//     return response.data;
//   },
//   resetPassword: async (data) => {
//     const response = await api.post("/api/v1/auth/reset-password", data);
//     return response.data;
//   },
//   verifyEmail: async (data) => {
//     const response = await api.post("/api/v1/auth/verify-email", data);
//     return response.data;
//   },
//   sendResendEmailConfirmation: async (data) => {
//     const response = await api.post("/api/v1/auth/send-email-confirmation", data);
//     return response.data;
//   },
//   refreshToken: async (data) => {
//     const response = await api.post("/api/v1/auth/refresh-toke", data);
//     return response.data;
//   }
// };

// import api from "./api";

// export const authApi = {
//   register: async (data) => {
//     const response = await api.post("/api/v1/auth/register", data);
//     return response.data;
//   },

//   login: async (data) => {
//     const response = await api.post("/api/v1/auth/login", data);
//     return response.data;
//   },

//   forgetPassword: async (data) => {
//     const response = await api.post("/api/v1/auth/forgot-password", data);
//     return response.data;
//   },

//   resetPassword: async (data) => {
//     const response = await api.post("/api/v1/auth/reset-password", data);
//     return response.data;
//   },

//   verifyEmail: async (data) => {
//     const response = await api.post("/api/v1/auth/verify-email", data);
//     return response.data;
//   },

//   sendResendEmailConfirmation: async (data) => {
//     const response = await api.post(
//       "/api/v1/auth/send-email-confirmation",
//       data
//     );
//     return response.data;
//   },

//   refreshToken: async (data) => {
//     const response = await api.post("/api/v1/auth/refresh-token", data);
//     return response.data;
//   },
//    changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
//     const response = await api.post("/api/v1/auth/change-password", {
//       currentPassword,
//       newPassword,
//       confirmPassword,
//     });
//     return response.data;
//   },
// };
import api from "./api";

export const authApi = {
  register: async (data) => {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post("/api/v1/auth/login", data);
    return response.data;
  },

  forgetPassword: async (data) => {
    const response = await api.post("/api/v1/auth/forgot-password", data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await api.post("/api/v1/auth/reset-password", data);
    return response.data;
  },

  verifyEmail: async (data) => {
    const response = await api.post("/api/v1/auth/verify-email", data);
    return response.data;
  },

  sendResendEmailConfirmation: async (data) => {
    const response = await api.post(
      "/api/v1/auth/send-email-confirmation",
      data
    );
    return response.data;
  },

  refreshToken: async (data) => {
    const response = await api.post("/api/v1/auth/refresh-token", data);
    return response.data;
  },

  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    const response = await api.post("/api/v1/auth/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  // POST /api/v1/auth/logout
  // بيلغي فقط الـ refreshToken المرسل. الـ accessToken (JWT) نفسه stateless
  // وما بينلغي من طرف السيرفر، فلازم نمسح بيانات الجلسة محليًا بعد النجاح.
  logout: async (refreshToken) => {
    const response = await api.post("/api/v1/auth/logout", {
      refreshToken,
    });
    return response.data;
  },
};
