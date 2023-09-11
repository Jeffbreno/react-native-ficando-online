import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:3000/",
  baseURL: "https://api.github.com",
});

export default api;
