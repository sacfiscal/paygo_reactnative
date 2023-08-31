import axios from "axios";

export default instance = axios.create({
  baseURL: "https://api.nuvemfiscal.com.br",
  timeout: 1000,
});

export const setClientToken = (token) => {
  instance.interceptors.request.use(function (config) {
    console.log("configurando chamada");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
