import "./App.css";
import Home from "./Home";
import Chat from "./Chat";
import Admin from "./Admin";
import Post from "./Post";
import AdDetail from "./AdDetail";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import UserProfile from "./components/userProfile";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faComment,
  faUserShield,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = useState({});
  const [adminUsers, setAdminUsers] = useState([]);

  // Function to get the value of a cookie by name
  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  useEffect(() => {
    const userEmail = getCookie('userEmail');
    if (userEmail) {
      setUser({email: userEmail});
    }

    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        const admins = users
          .filter((user) => user.admin)
          .map((user) => user.email);
        setAdminUsers(admins);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <aside className="sidebar">
          <Link to="/">
            <img id="logo" src="/logo.png" alt="Logo" />
          </Link>

          <div className="nav-container">
            {Object.keys(user).length > 0 && (
              <>
                <Link className="btn waves-effect icon-link center" to="/">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link className="btn waves-effect icon-link center" to="/Chat">
                  <FontAwesomeIcon icon={faComment} />
                </Link>
                <Link className="btn waves-effect icon-link center" to="/Post">
                  <FontAwesomeIcon icon={faSquarePlus} />
                </Link>
                {adminUsers.includes(user.email) && (
                  <Link
                    className="btn waves-effect icon-link center"
                    to="/Admin"
                  >
                    <FontAwesomeIcon icon={faUserShield} />
                  </Link>
                )}
              </>
            )}
          </div>
          <div id="user-profile">
            {Object.keys(user).length > 0 && (
              <>
                <UserProfile user={user} />
                <LogoutButton setUser={setUser} />
              </>
            )}
          </div>
        </aside>
        <main className="main-content">
          {Object.keys(user).length === 0 ? (
            <div className="not-logged-in-container">
              <div className="login-prompt">
                <h1>Welcome to Metropolitan Market</h1>
                <p>Please log in to view ad postings.</p>
                <LoginButton setUser={setUser} />
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/Chat" element={<Chat user={user} />} />
              <Route path="/Post" element={<Post user={user} />} />
              <Route path="/ads/:id" element={<AdDetail user={user} />} />
              {adminUsers.includes(user.email) && (
                <Route
                  path="/Admin"
                  element={
                    adminUsers.includes(user.email) ? (
                      <Admin user={user} />
                    ) : (
                      <Navigate replace to="/" />
                    )
                  }
                />
              )}
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
