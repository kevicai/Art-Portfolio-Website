import axios from "axios";
import authService from "./authService";

const baseUrl = "/api/users";

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
