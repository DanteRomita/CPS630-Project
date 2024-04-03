import "./App.css";
import AdListings from "./components/adListings";
import FadeIn from "react-fade-in";

function App({ user }) {

  return (
    <div className="App">
      <FadeIn>
        <AdListings user={user}/>
      </FadeIn>
    </div>
  );
}

export default App;
