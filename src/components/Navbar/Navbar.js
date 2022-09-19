import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [showCommsSubMenu, setShowCommsSubMenu] = useState(false);

  const { pathname, hash, key } = useLocation();

  // handle path change
  useEffect(() => {
    if (pathname === "/comms") {
      setShowCommsSubMenu(true);
    } else {
      setShowCommsSubMenu(false);
    }

    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  // check login
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

  const logOut = () => {
    authService.logout();
    checkLogin();
  };
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
        <>
          <div className="nav-links">
            Welcome,
            <div> {authService.getCurrUserName().slice(0, 10)}</div>
          </div>
          <div className="logout-btn" onClick={logOut}>
            Log Out
          </div>
        </>
      )}

      {MenuItems.map((item, index) => (
        <div
          key={index}
          className="nav-link-container"
          onMouseEnter={() => {
            item.subMenu && setShowCommsSubMenu(true);
          }}
          onMouseLeave={() => {
            item.subMenu && pathname !== "/comms" && setShowCommsSubMenu(false);
          }}
        >
          <Link to={item.path} className={item.cName}>
            {item.icon}
            <div className="navlink-space"></div>
            <span>{item.title}</span>
          </Link>
          {item.subMenu && showCommsSubMenu && (
            <div className="sub-links-container">
              {item.subMenu.map((subItem, subIndex) => (
                <div className="line-break" key={subIndex}>
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className={subItem.cName}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
