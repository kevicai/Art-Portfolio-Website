import axios from "axios";
import authService from "./authService";
import { apiUrl } from "../utils/deploymentUrl";

const baseUrl = apiUrl + "/users";

const getCurrUserBlogs = async () => {
  if (authService.checkLogin()) {
    const request = await axios.get(
      baseUrl + "/blogs",
      authService.getAuthHeader()
    );
    return request.data.blogs;
  }
  return [];
};

const userService = {
  getCurrUserBlogs,
};

export default userService;
