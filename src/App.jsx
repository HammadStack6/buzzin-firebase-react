import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar"; // Import Navbar
// import UsersChat from "./UsersChat"; // Placeholder for the Users & Chat page
import Chat from "./Chat"; // Add the Chat component

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/users-chat" element={<UsersChat />} /> */}
        <Route path="/chat" element={<Chat />} /> {/* Add the Chat route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
