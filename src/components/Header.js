import React from "react";
import { Link } from "react-router-dom";
import '../style/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Dashboard</h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/search">Search</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
