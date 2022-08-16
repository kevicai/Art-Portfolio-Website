import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ArtworkPage from "./pages/ArtworkPage";
import CommsPage from "./pages/CommsPage";

export default function ReactRouter() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/art" element={<LandingPage />} />
      <Route path="/art/artworks" element={<ArtworkPage />} />
      <Route path="/art/comms" element={<CommsPage />} />
    </Routes>
  </Router>
  )
}
