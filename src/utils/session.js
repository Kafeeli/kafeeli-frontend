const SESSION_STORAGE_KEYS = [
  "token",
  "refreshToken",
  "user",
  "pendingVerificationEmail",
];

export function clearSessionStorage() {
  SESSION_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

export function getStoredUser() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    const user = JSON.parse(storedUser);
    return user && typeof user === "object" && !Array.isArray(user)
      ? user
      : null;
  } catch {
    return null;
  }
}

export function getUserRoles(user) {
  const role = user?.role;
  const roles = Array.isArray(role) ? role : [role];

  return roles.filter(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
}
