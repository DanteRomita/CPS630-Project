import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faBan } from '@fortawesome/free-solid-svg-icons';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const toggleAdmin = (email) => {
    fetch(`http://localhost:3001/api/users/toggleAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(fetchUsers);
  };

  const toggleBan = (email) => {
    fetch(`http://localhost:3001/api/users/toggleBan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(fetchUsers);
  };

  return (
    <div className="user-admin-container">
      <h2>User Administration</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.email} className="user-item">
            <div className="user-info">
              <p>{user.email}</p>
              <div className="user-actions">
                <label>
                  <input
                    type="checkbox"
                    checked={user.admin}
                    onChange={() => toggleAdmin(user.email)}
                  />
                  <FontAwesomeIcon icon={faUserShield} className="icon" /> Admin
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={user.banned}
                    onChange={() => toggleBan(user.email)}
                  />
                  <FontAwesomeIcon icon={faBan} className="icon" /> Ban
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersAdmin;
