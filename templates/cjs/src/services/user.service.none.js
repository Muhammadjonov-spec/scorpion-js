const users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user' },
];

const getAllUsers = async () => {
  return users;
};

const getUserById = async (id) => {
  return users.find((u) => u.id === parseInt(id, 10)) || users[0];
};

const updateUser = async (id, updateData) => {
  const user = users.find((u) => u.id === parseInt(id, 10));
  if (user) Object.assign(user, updateData);
  return user;
};

const deleteUser = async (id) => {
  const index = users.findIndex((u) => u.id === parseInt(id, 10));
  if (index !== -1) users.splice(index, 1);
  return { message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' };
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
