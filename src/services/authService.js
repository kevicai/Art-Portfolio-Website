import axios from "axios";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../utils/deploymentUrl";

const baseUrl = apiUrl;

const signup = async (credentials) => {
  try {
    const response = await axios.post(baseUrl + "/signup", credentials);

    if (response.data) {
      const user = response.data;
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      console.log("signup success");

      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl + "/login", credentials);

    const user = response.data;
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    console.log("login success");

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (user && user.token) {
    return { headers: { Authorization: `bearer ${user.token}` } };
  } else {
    return {};
  }
};

const checkLogin = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);

    // check token expiration
    // console.log(jwt_decode(user.token));
    const exp = jwt_decode(user.token).exp;

    // console.log("token expire in " + (exp * 1000 - Date.now()));
    if (Date.now() >= exp * 1000) {
      window.localStorage.clear();
      return false;
    }

    return true;
  } else {
    return false;
  }
};

const getCurrUserName = () => {
  return JSON.parse(localStorage.getItem("loggedUser")).name;
};

const getCurrUserId = () => {
  return JSON.parse(localStorage.getItem("loggedUser")).id;
};

const logout = () => {
  localStorage.removeItem("loggedUser");
};

// eslint-disable-next-line
const authService = {
  signup,
  login,
  checkLogin,
  getAuthHeader,
  logout,
  getCurrUserName,
  getCurrUserId,
};

export default authService;
