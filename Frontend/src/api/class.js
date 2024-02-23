import instance from ".";

export const getAllClasses = async () => {
  const res = await instance.get("/classSchedules");

  return res.data;
};

export const getClassByTrainer = async (id) => {
  const res = await instance.get(`/classSchedules?trainer=${id}`);

  return res.data;
};

export const createClass = async (data) => {
  const res = await instance.post("/classSchedules", data);

  return res.data;
};

export const getClassByName = async (data) => {
  const res = await instance.get(`/classSchedules/classByName/${data}`);

  return res.data;
};
