import api from "./api";

export const sponsorApi = {
  getFamilies: async () => {
    const response = await api.get("/api/v1/families");
    return response.data;
  },

  getFamily: async (familyId) => {
    const response = await api.get(`/api/v1/families/${familyId}`);
    return response.data;
  },

  getOrphans: async () => {
    const response = await api.get("/api/v1/orphans");
    return response.data;
  },

  getOrphan: async (orphanId) => {
    const response = await api.get(`/api/v1/orphans/${orphanId}`);
    return response.data;
  },

  getOrphanProfileImage: async (orphanId) => {
    const response = await api.get(`/api/v1/orphans/${orphanId}/profile-image`, {
      responseType: "blob",
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/api/v1/sponsors/me");
    return response.data;
  },

  updateProfile: async (data) => {
    const formData = new FormData();
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("Gender", data.gender); // 1 = ذكر, 2 = أنثى
    formData.append("City", data.city);
    const dateOnly = data.dateOfBirth.split("T")[0];
    const dateOfBirth = new Date(`${dateOnly}T00:00:00.000Z`).toISOString();
    formData.append("DateOfBirth", dateOfBirth);
    if (data.profileImage) {
      formData.append("ProfileImage", data.profileImage);
    }

    const response = await api.put("/api/v1/sponsors/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
