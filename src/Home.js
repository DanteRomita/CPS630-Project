import "./App.css";
import AdListings from "./components/adListings";
import FadeIn from "react-fade-in";

function App() {

  return (
    <div className="App">
      <FadeIn>
        <AdListings />
      </FadeIn>
    </div>
  );
}

export default App;
