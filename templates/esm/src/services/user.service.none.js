const users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user' },
];

export const getAllUsers = async () => {
  return users;
};

export const getUserById = async (id) => {
  return users.find((u) => u.id === parseInt(id, 10)) || users[0];
};

export const updateUser = async (id, updateData) => {
  const user = users.find((u) => u.id === parseInt(id, 10));
  if (user) Object.assign(user, updateData);
  return user;
};

export const deleteUser = async (id) => {
  const index = users.findIndex((u) => u.id === parseInt(id, 10));
  if (index !== -1) users.splice(index, 1);
  return { message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' };
};
