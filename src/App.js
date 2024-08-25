// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Pagination from './components/Pagination';
import "./App.css";
import MainContent from "./components/MainContent";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainContent />} />
            {/* Optional Routes */}
            <Route path="/search" element={<Search />} />
            <Route path="/pagination" element={<Pagination />} />
          </Routes>
        </main>
     
      </div>
    <div>
    
    </div>
    <Footer />
    </Router>
    
  );
}

export default App;
