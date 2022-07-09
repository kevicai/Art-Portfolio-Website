import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './pages/LandingPage';
import ArtworkPage from './pages/ArtworkPage';
import CommsPage from './pages/CommsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <nav>
            <Link to="/art">Home</Link>
            <Link to="/art/artworks">Artworks</Link>
            <Link to="/art/comms">Commissions</Link>
        </nav>

        <Routes>
            <Route path="/art" element={<LandingPage />}/>
            <Route path="/art/artworks" element={<ArtworkPage />}/>
            <Route path="/art/comms" element={<CommsPage />}/>
        </Routes>
    </Router>
);

