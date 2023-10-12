import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CompanyRegistration } from "./components/CompanyRegistration/CompanyRegistration";
import { UserRegistration } from "./components/CreateUser/CreateUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CompanyRegistration />} />
        <Route path="/user/create" element={<UserRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
