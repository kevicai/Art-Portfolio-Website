import React from "react";
import { Link } from "react-router-dom";

import navBackground from "../images/nav-background.svg";
import navIcon from "../images/nav-icon.svg";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/art">Home</Link>
      <Link to="/art/artworks">Artworks</Link>
      <Link to="/art/comms">Commissions</Link>
    </nav>
  );
}
