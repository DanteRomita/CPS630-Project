import "./App.css";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import AdListings from "./components/adListings";
import UserProfile from "./components/userProfile";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <LoginButton setUser={setUser}/>
      {Object.keys(user).length > 0 && (
        <>
          <UserProfile user={user} />
          <LogoutButton setUser={setUser} />
        </>
      )}
      <AdListings />
    </div>
  );
}

export default App;
