import FadeIn from "react-fade-in/lib/FadeIn.js";
import "./App.css";
import AdPosting from "./components/adPosting.js";
import DeletePosting from "./components/deletePosting.js";
function Admin({ user }) {

  return (
    <div className="App">
      <FadeIn>
        <h1>Admin Page</h1>
        <DeletePosting user={user}/>
      </FadeIn>
    </div>
  );
}

export default Admin;
