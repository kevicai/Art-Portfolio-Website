import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import ArtworkPage from "./pages/ArtworkPage";
import CommsPage from "./pages/CommsPage";
import { websiteUrlPrefix } from './utils/deploymentUrl';

export default function ReactRouter() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path={websiteUrlPrefix + "/"} element={<LandingPage />} />
      <Route path={websiteUrlPrefix + "/artworks"} element={<ArtworkPage />} />
      <Route path={websiteUrlPrefix + "/comms"} element={<CommsPage />} />
    </Routes>
  </Router>
  )
}
