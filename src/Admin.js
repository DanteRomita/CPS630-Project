import React, { useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import "./App.css";
import DeletePosting from "./components/deletePosting";
import UsersAdmin from "./components/manageUsers";

function Admin() {
  // State to track the current view ('deletePosts' or 'manageUsers')
  const [currentView, setCurrentView] = useState('deletePosts');

  return (
    <div>
      <FadeIn>
        <h1>Admin Page</h1>
        <div className="admin-buttons">
          <button
            className={`btn-large waves-effect icon-link center admin-button btn ${currentView === 'deletePosts' ? 'active' : ''}`}
            onClick={() => setCurrentView('deletePosts')}
          >
            Delete Posts
          </button>
          <button
            className={`btn-large waves-effect icon-link center admin-button btn ${currentView === 'manageUsers' ? 'active' : ''}`}
            onClick={() => setCurrentView('manageUsers')}
          >
            Manage Users
          </button>
        </div>
        
        {currentView === 'deletePosts' && <DeletePosting />}
        {currentView === 'manageUsers' && <UsersAdmin />}
      </FadeIn>
    </div>
  );
}

export default Admin;
