import React, { useState } from "react";
import "./ProfileAbout.css";
import "./Fonts.css";

import dropdownClose from "../icons/dropdown-close.svg";
import dropdownOpen from "../icons/dropdown-open.svg";

export default function ProfileAbout(props) {
  const [isOpen, setIsOpen] = useState(false);

  const styleClose = {
    backgroundImage: `url(${dropdownClose})`,
    height: "11.5vw",
    minHeight: "100px",
  };
  const styleOpen = {
    backgroundImage: `url(${dropdownOpen})`,
    height: "30vw",
    minHeight: "250px"
  };

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="profile-section">
      {isOpen ? (
        <div
          className="profile-dropdown profile-dropdown-open"
          onClick={handleClick}
          style={styleOpen}
        >
          <p className="light-font expand-about-info">
            {props.aboutTexts}
          </p>
          <div className="light-font expand-contacts">
            Contacts: {props.contacts}
          </div>
          <div className="dropdown-arrow up" onClick={handleClick}></div>
        </div>
      ) : (
        <div
          className="profile-dropdown"
          onClick={handleClick}
          style={styleClose}
        >
          <p className="light-font">about</p>
          <div className="dropdown-arrow down" onClick={handleClick}></div>
        </div>
      )}

      <div
        className="profile-pic"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.profilePic})` }}
      ></div>
    </div>
  );
}
