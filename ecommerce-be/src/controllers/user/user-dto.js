export const userResponseDTO = (user) => {
  return {
    id: user.id,
    username: user.username,
    fullName: `${user.firstName} ${user.lastName}`,
    role: user.role,
    phone: user.phoneNumber || "N/A",
    createdAt: user.createdAt,
  };
};
