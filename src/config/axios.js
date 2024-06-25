import axios from "axios";

export const api = axios.create({
  // baseURL: "http://jeweljoust.online:8080/api/",
  baseURL: "http://localhost:8080/api/",

  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// const baseUrl = "http://localhost:8080/api/";

// const config = {
//   baseUrl,
//   timeout: 3000000,
// };

// //

// const api = axios.create(config);
// api.defaults.baseURL = baseUrl;
// const handleBefore = (config) => {
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// };
// const handleError = (error) => {
//   console.log(error);
//   return;
// };
// api.interceptors.request.use(handleBefore, handleError);
// // api.interceptors.response.use(null, handleError);

// export default api;
