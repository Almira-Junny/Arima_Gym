import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

const loadTokenIntoHeader = (config) => {
  const { token } = store.getState().auth;

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
};

instance.interceptors.request.use(
  (config) => loadTokenIntoHeader(config),
  (error) => Promise.reject(error)
);

export default instance;
