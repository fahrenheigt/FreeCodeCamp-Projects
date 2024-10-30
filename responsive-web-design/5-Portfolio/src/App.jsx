import React from "react";
import { Routes, Route } from "react-router-dom";

function App(){
    return <div className="Body">
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </div>
}

export default App;