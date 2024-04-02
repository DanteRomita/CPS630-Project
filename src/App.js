import "./App.css";
import Home from "./Home";
import Chat from "./Chat";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import UserProfile from "./components/userProfile";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <div className="app-container">
        <aside className="sidebar">
          <nav className="nav-container">
            <Link className="btn waves-effect" to="/">
              Home
            </Link>
            <Link className="btn waves-effect" to="/Chat">
              Chat
            </Link>
          </nav>
          <LoginButton setUser={setUser} />
          {Object.keys(user).length > 0 && (
            <>
              <UserProfile user={user} />
              <LogoutButton setUser={setUser} />
            </>
          )}
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Chat" element={<Chat user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
