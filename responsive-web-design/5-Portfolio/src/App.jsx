// Import necessary libaries
import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, useNavigate } from "react-router-dom";

// Import functions
import ScrollToTop from "./assets/functions/ScrollToTop";

// Import pages
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Skills from "./pages/skills/skills";

// Import components
import NavBar from "./components/navBar/navBar";

function App(){

    return (
    <div className="App">
        <ScrollToTop />
        <NavBar></NavBar>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
        </Routes>
    </div>
    )
}

export default App;