import instance from ".";

export const createRegistration = async ({ classId, userId }) => {
  const res = await instance.post("/classRegistrations", {
    class: classId,
    user: userId,
  });

  return res.data;
};

export const getRegistrationByUser = async (userId) => {
  const res = await instance.get(`/classRegistrations?user=${userId}`);

  return res.data;
};
