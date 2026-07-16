import api from "./api";

export const guardianApi = {
  // GET /api/v1/guardians/me
  // يرجع: guardianId, fullName, email, phoneNumber, dateOfBirth, gender,
  // city, country, verificationStatus, emailVerificationStatus, joinedAt,
  // profileImageUrl, hasProfileImage, canAddPayoutAccount, payoutAccount
  getProfile: async () => {
    const response = await api.get("/api/v1/guardians/me");
    return response.data;
  },

  // PUT /api/v1/guardians/me  (multipart/form-data)
  // بيسمح فقط بتعديل: PhoneNumber*, DateOfBirth*, Gender*, City*, ProfileImage (اختياري)
  updateProfile: async (data) => {
    const formData = new FormData();
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("DateOfBirth", data.dateOfBirth); // yyyy-MM-dd
    formData.append("Gender", data.gender); // "Male" أو "Female"
    formData.append("City", data.city);
    if (data.profileImage) {
      formData.append("ProfileImage", data.profileImage);
    }

    const response = await api.put("/api/v1/guardians/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
