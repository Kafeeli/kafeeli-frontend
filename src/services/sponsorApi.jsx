import api from "./api";

export const sponsorApi = {
  getProfile: async () => {
    const response = await api.get("/api/v1/sponsors/me");
    return response.data;
  },

  updateProfile: async (data) => {
    const formData = new FormData();
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("Gender", data.gender); // 1 = ذكر, 2 = أنثى
    formData.append("City", data.city);
    formData.append("DateOfBirth", data.dateOfBirth); // بصيغة ISO كاملة
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