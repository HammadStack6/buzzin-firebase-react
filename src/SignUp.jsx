import React, { useState } from "react";
import "./SignUp.css";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; // <-- added useNavigate
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User created successfully");
      navigate("/"); // <-- Redirect to Home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img src={logo} alt="App Logo" className="app-logo" />
        <h2>Sign Up</h2>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button> <br />
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
