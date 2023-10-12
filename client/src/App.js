import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CompanyRegistration } from "./components/CompanyRegistration/CompanyRegistration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CompanyRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
