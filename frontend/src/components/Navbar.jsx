import React from "react";
import '../styles/Navbar.css'; // Create this CSS file for styles


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Vote</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/streamlit">Chatbot</a></li>
        <li><a href="/organize">Organize</a></li>
        <li><a href="/organizedlist">Events</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;