import { useState } from "react";
import authService from "../../services/authService";

import "./LoginForm.css";

const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async (name, email, password) => {
    const response = await authService.signup({
      name,
      email,
      password,
    });
    props.checkLogin();
    if (response.error) {
      setErrorMessage(response.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    else{
      setEmail("");
      setPassword("");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSignup(name, email, password);
  };

  return (
    <div className="login-form" style={props.marginLeft}>
      <form className="regular-font login-form-font" onSubmit={onSubmit}>
        <div className="login-label">Name</div>
        <input
          className="login-input"
          type="name"
          value={name}
          name="Name"
          onChange={({ target }) => setName(target.value)}
        />
        <div className="login-label">Email</div>
        <input
          className="login-input"
          type="email"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className="login-label">Password</div>
        <input
          className="login-input"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="error-message">{errorMessage}</div>
        <button className="login-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
