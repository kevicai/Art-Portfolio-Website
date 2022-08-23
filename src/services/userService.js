let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const userService = { setToken };

export default userService;
