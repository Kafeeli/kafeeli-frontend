import api from "./api";

export const dashboardApi = {
  getMine: async () => {
    const response = await api.get("/api/v1/dashboard/me");
    return response.data;
  },
};
