import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import NavBar from "./components/navBar/navBar";

function App(){
    return (
    <div className="app">
        <NavBar></NavBar>
        <Home></Home>
    </div>
    )
}

export default App;