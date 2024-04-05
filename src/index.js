import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

let clientId;

try {
  const response = await fetch("/api/oauthtoken", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  clientId = await response.json();
} catch (error) {
  console.error("Error fetching users:", error.message);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId.oauthtoken}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
