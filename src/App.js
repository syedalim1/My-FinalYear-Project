import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage/LoginPage";
import RegisterPage from "./Component/RegisterPage/RegisterPage";
import HomePage from "./Component/Homepage/Homepage";
import BusesPage from "./Component/BusesPage/BusesPage";
import MapPage from "./Component/MapPage/MapPage";

function App() {
  return (
    <Router>
      <Routes>
        SAy
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
