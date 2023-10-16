import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CompanyRegistration } from "./components/CompanyRegistration/CompanyRegistration";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { UserRegistration } from "./components/CreateUser/CreateUser";
import Login from "./components/Login/Login";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CompanyRegistration />} />
        <Route path="/user/create" element={<UserRegistration />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
