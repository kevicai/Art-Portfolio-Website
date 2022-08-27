import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import OutsideClickHandler from "react-outside-click-handler";
import "./Navbar.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import authService from "../../services/authService";

// import navBackground from "../../icons/nav-background.svg";
// import navIcon from "../../icons/nav-icon.svg";

// TODO: handle phone screen, use the above imports
export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginMenuClick, setIsLoginMenuClick] = useState(false);
  const [loginFormStyle, setLoginFormStyle] = useState({
    marginLeft: "-150px",
  });
  const [isSignupMenuClick, setIsSignupMenuClick] = useState(false);
  const [signupFormStyle, setSignupFormStyle] = useState({
    marginLeft: "-150px",
  });

  useEffect(() => {
    setIsLogin(authService.checkLogin());
  }, []);

  const onLoginMenuClick = () => {
    setIsSignupMenuClick(false);
    setIsLoginMenuClick(!isLoginMenuClick);
  };

  const onSignupMenuClick = () => {
    setIsLoginMenuClick(false);
    setIsSignupMenuClick(!isSignupMenuClick);
  };

  useEffect(() => {
    if (isLoginMenuClick) {
      setLoginFormStyle({ marginLeft: "30px" });
    } else {
      setLoginFormStyle({ marginLeft: "-150px" });
    }
  }, [isLoginMenuClick]);

  useEffect(() => {
    if (isSignupMenuClick) {
      setSignupFormStyle({ marginLeft: "30px" });
    } else {
      setSignupFormStyle({ marginLeft: "-150px" });
    }
  }, [isSignupMenuClick]);

  const checkLogin = () => {
    setIsLogin(authService.checkLogin());
  };

  // TODO: add outside menu click to close forms

  return (
    <nav className="navbar regular-font">
      {!isLogin ? (
        <>
          <OutsideClickHandler
            onOutsideClick={() => setIsLoginMenuClick(false)}
          >
            <div className="nav-login nav-links" onClick={onLoginMenuClick}>
              Login
            </div>

            {isLoginMenuClick && (
              <LoginForm checkLogin={checkLogin} marginLeft={loginFormStyle} />
            )}
          </OutsideClickHandler>

          <OutsideClickHandler
            onOutsideClick={() => setIsSignupMenuClick(false)}
          >
            <div className="nav-login nav-links" onClick={onSignupMenuClick}>
              Sign Up
            </div>
            {isSignupMenuClick && (
              <SignupForm
                checkLogin={checkLogin}
                marginLeft={signupFormStyle}
              />
            )}
          </OutsideClickHandler>
        </>
      ) : (
        <Link className="nav-links" to="/user">
          {" "}
          Welcome
        </Link>
      )}
      {MenuItems.map((item, index) => (
        <Link key={index} to={item.path} className={item.cName}>
          {item.icon}
          <div className="navlink-space"></div>
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
