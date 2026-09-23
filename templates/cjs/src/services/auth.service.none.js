const { generateToken } = require('../utils/jwt');

const users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
];

const register = async ({ name, email, password, role = 'user' }) => {
  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);
  const token = generateToken({ id: newUser.id, role: newUser.role });
  return { user: { id: newUser.id, name, email, role }, token };
};

const login = async ({ email }) => {
  const user = users.find((u) => u.email === email) || users[0];
  const token = generateToken({ id: user.id, role: user.role });
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const getMe = async (userId) => {
  return users.find((u) => u.id === parseInt(userId, 10)) || users[0];
};

module.exports = { register, login, getMe };
