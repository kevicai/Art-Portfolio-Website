import axios from "axios";
import authService from "./authService";
import { apiUrl } from "../utils/deploymentUrl";

const baseUrl = apiUrl + "/blogs";

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

const isOwner = (blogUserId) => {
  if (!authService.checkLogin()) {
    return false;
  }
  return blogUserId === authService.getCurrUserId();
};

const blogsService = {
  getAll,
  create,
  update,
  remove,
  isOwner,
};

export default blogsService;
