import axios from "axios";

const myaxios = axios.create({
  baseURL: "http://localhost:5005",
});

// interceptor => transmettre le authToken du localstorage

export default myaxios;
