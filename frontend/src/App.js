import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function LoginPage() {
  return (
    <div style={styles.page}>
      <h1>Login</h1>
      <p>Login functionality coming soon...</p>
    </div>
  );
}

function RegisterPage() {
  return (
    <div style={styles.page}>
      <h1>Register</h1>
      <p>Registration functionality coming soon...</p>
    </div>
  );
}

const styles = {
  content: {
    padding: "2rem",
    minHeight: "calc(100vh - 70px)",
    backgroundColor: "#f8f9fa",
  },
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem",
    textAlign: "center",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default App;
