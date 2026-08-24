import api from "./api";

export const currentUserApi = {
  getSession: async () => {
    const response = await api.get("/api/v1/users/me");
    return response.data;
  },
};
