import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // To navigate if not logged in
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        user: auth.currentUser.email,
      });
      setNewMessage(""); // Reset the input after sending
    } catch (err) {
      setError("Failed to send message");
    }
  };

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <button onClick={handleSignOut}>Logout</button>
      </div>

      <div className="chat-body">
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="message">
              <p>
                <strong>{message.user}:</strong> {message.text}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="chat-footer">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;
