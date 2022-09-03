import axios from "axios";
import authService from "./authService";

const baseUrl = "/api/blogs";

const getAll = async (queryParams) => {
  const request = await axios.get(baseUrl, {
    params: queryParams,
  });
  return request.data;
};

const create = async (blogObject) => {
  const response = await axios.post(
    baseUrl,
    blogObject,
    authService.getAuthHeader()
  );
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    newObject,
    authService.getAuthHeader()
  );
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    authService.getAuthHeader()
  );
  return response.data;
};

const blogsService = {
  getAll,
  create,
  update,
  remove,
};

export default blogsService;
