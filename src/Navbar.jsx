import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth
import logo from "./assets/logo.png"; // Import your logo if needed
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    auth.signOut(); // Sign the user out
  };

  const user = auth.currentUser;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="App Logo" className="app-logo" />
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/chat" className="navbar-item">
          Chat
        </Link>
        {user ? (
          <>
            <span className="navbar-item">Welcome, {user.email}</span>
            <button onClick={handleLogout} className="navbar-item">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/signup" className="navbar-item">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
