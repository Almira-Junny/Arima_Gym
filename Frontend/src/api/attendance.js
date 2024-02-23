import instance from ".";

export const getAttendanceToday = async () => {
  const res = await instance.get("/attendances/today");

  return res.data;
};

export const getMyAttendance = async () => {
  const res = await instance.get("/attendances/me?sort=-checkInTime");

  return res.data;
};

export const getLatestAttendance = async () => {
  const res = await instance.get("/attendances/me?limit=6&sort=-checkInTime");

  return res.data;
};
