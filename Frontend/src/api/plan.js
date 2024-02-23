import instance from ".";

export const getAllPlans = async () => {
  const res = await instance.get("/plans");

  return res.data;
};

export const getTopPlans = async () => {
  const res = await instance.get("/plans?limit=3");

  return res.data;
};

export const createPlan = async (data) => {
  const res = await instance.post("/plans", data);

  return res.data;
};

export const deletePlan = async (ids) => {
  const promiseMap = ids.map((id) => instance.delete(`/plans/${id}`));

  const res = await Promise.all(promiseMap);

  return res.data;
};

export const getPlanByName = async (data) => {
  const res = await instance.get(`/plans/planByName/${data}`);

  return res.data;
};
