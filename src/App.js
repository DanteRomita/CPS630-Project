import "./App.css";
import Home from "./Home";
import Chat from "./Chat";
import Admin from "./Admin";
import Post from "./Post";
import AdDetail from "./AdDetail";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import UserProfile from "./components/userProfile";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faComment,
  faUserShield,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = useState({});

  const adminEmails = process.env.REACT_APP_ADMINS.split(",");

  return (
    <BrowserRouter>
      <div>
        <aside className="sidebar">
          <div className="nav-container">
            <Link className="btn waves-effect icon-link center" to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link className="btn waves-effect icon-link center" to="/Chat">
              <FontAwesomeIcon icon={faComment} />
            </Link>
            <Link className="btn waves-effect icon-link center" to="/Post">
              <FontAwesomeIcon icon={faSquarePlus} />
            </Link>
            {adminEmails.includes(user.email) && (
              <Link className="btn waves-effect icon-link center" to="/Admin">
                <FontAwesomeIcon icon={faUserShield} />
              </Link>
            )}
          </div>
          <div className="center" id="user-profile">
            <LoginButton setUser={setUser} />
            {Object.keys(user).length > 0 && (
              <>
                <UserProfile user={user} />
                <LogoutButton setUser={setUser} />
              </>
            )}
          </div>
        </aside>
        {Object.keys(user).length > 0 ? (
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/Chat" element={<Chat user={user} />} />
              <Route path="/Post" element={<Post user={user} />} />
              <Route path="/ads/:id" element={<AdDetail />} />
              {adminEmails.includes(user.email) && (
                <Route path="/Admin" element={<Admin user={user} />} />
              )}
            </Routes>
          </main>
        ) : (
          <div className="container right">
            <h1 className="right">Please log in to view content.</h1>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
