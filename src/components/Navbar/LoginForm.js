import { useState } from "react";
import authService from "../../services/authService";

import "./LoginForm.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (email, password) => {
    const response = await authService.login({
      email,
      password,
    });
    props.checkLogin();
    if (response.error) {
      setErrorMessage(response.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      console.log(1)
      setEmail("");
      setPassword("");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-form" style={props.marginLeft}>
      <form className="regular-font login-form-font" onSubmit={onSubmit}>
        <div className="login-label">email</div>
        <input
          className="login-input"
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className="login-label">password</div>
        <input
          className="login-input"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="error-message">{errorMessage}</div>
        <button className="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
