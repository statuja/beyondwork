import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CompanyRegistration } from "./components/CompanyRegistration/CompanyRegistration";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<CompanyRegistration />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
