import instance from ".";

export const getLatestPayments = async () => {
  const res = await instance.get("/payments?limit=6&sort=-date");

  return res.data;
};

export const getAllPayments = async () => {
  const res = await instance.get("/payments?sort=-date");

  return res.data;
};

export const getCheckoutSession = async (id) => {
  const res = await instance.get(`/payments/checkout-session/${id}`);

  return res.data;
};

export const getPaymentByName = async (data) => {
  const res = await instance.get(`/payments/paymentByName/${data}`);

  return res.data;
};
