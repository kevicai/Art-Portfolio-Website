import React, { useState } from "react";
import "./ProfileAbout.css";
import "./Fonts.css";

import dropdownClose from "../images/dropdown-close.svg";
import dropdownOpen from "../images/dropdown-open.svg";

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

  const handlClick = () => setIsOpen(!isOpen);

  return (
    <div className="profile-section">
      {isOpen ? (
        <div
          className="profile-dropdown profile-dropdown-open"
          onClick={handlClick}
          style={styleOpen}
        >
          <p className="light-font expand-about-info">
            {props.aboutTexts}
          </p>
          <div className="light-font expand-contacts">
            Contacts: {props.contacts}
          </div>
          <div className="dropdown-arrow up" onClick={handlClick}></div>
        </div>
      ) : (
        <div
          className="profile-dropdown"
          onClick={handlClick}
          style={styleClose}
        >
          <p className="light-font">about</p>
          <div className="dropdown-arrow down" onClick={handlClick}></div>
        </div>
      )}

      <div
        className="profile-pic"
        onClick={handlClick}
        style={{ backgroundImage: `url(${props.profilePic})` }}
      ></div>
    </div>
  );
}
