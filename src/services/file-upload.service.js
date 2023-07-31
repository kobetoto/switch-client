import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getItems = () => {
  return api
    .get("/items")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (formData) => {
  return api
    .post("/upload", formData)
    .then((res) => res.data)
    .catch(errorHandler);
};

const creatItem = (newMovie) => {
  return api
    .post("/items", newMovie)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  getItems,
  uploadImage,
  creatItem,
};
