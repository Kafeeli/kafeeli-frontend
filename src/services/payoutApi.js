import api from "./api";

export const payoutApi = {
  getMine: async () => {
    const response = await api.get("/api/v1/guardians/me/payouts");
    return response.data;
  },
  getMineById: async (payoutId) => {
    const response = await api.get(`/api/v1/guardians/me/payouts/${payoutId}`);
    return response.data;
  },
};
