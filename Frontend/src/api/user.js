import instance from ".";

export const getUserById = async (id) => {
  const res = await instance.get(`/users/${id}`);

  return res.data;
};

export const getAllUsers = async () => {
  const res = await instance.get("/users?role=user");

  return res.data;
};

export const getAllPts = async () => {
  const res = await instance.get("/users?role=pt");
  return res.data;
};

export const scanQr = async (qr) => {
  const res = await instance.get(`/users/scanQr/${qr}`);

  return res.data;
};

export const createQr = async () => {
  const res = await instance.get("users/createQr");

  return res.data;
};

export const getTopPts = async () => {
  const res = await instance.get("/users?role=pt&limit=3");
  return res.data;
};

export const updateMe = async (data) => {
  const res = await instance.patch("/users/updateMe", data);

  return res.data;
};

export const createUser = async (formData) => {
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  const res = await instance.post("/users", object);

  return res.data;
};

export const getUserByNumber = async (data) => {
  const res = await instance.get(`/users/searchUserByNumber/${data}?role=user`);

  return res.data;
};

export const getPtByNumber = async (data) => {
  const res = await instance.get(`/users/searchUserByNumber/${data}?role=pt`);

  return res.data;
};
