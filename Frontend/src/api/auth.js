import instance from ".";

const login = async (data) => {
  const res = await instance.post("/users/login", data);

  return res.data;
};

const signup = async (data) => {
  const res = await instance.post("/users/signup", data);

  return res.data;
};

const forgotPassword = async (email) => {
  const res = await instance.post("/users/forgotPassword", email);

  return res.data;
};

const resetPassword = async (token, data) => {
  const res = await instance.patch(`/users/resetPassword/${token}`, data);

  return res.data;
};

const updatePassword = async (data) => {
  const res = await instance.patch("/users/updatePassword", data);

  return res.data;
};

const logout = async () => {
  const res = await instance.post("/users/logout");

  return res.data;
};

const AuthService = {
  login,
  signup,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
};

export default AuthService;
