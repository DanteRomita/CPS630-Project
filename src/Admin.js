import FadeIn from "react-fade-in/lib/FadeIn.js";
import "./App.css";
import AdPosting from "./components/adPosting.js";
function App() {

  return (
    <div className="App">
      <FadeIn>
        <h1>Admin Page</h1>
        <AdPosting />
      </FadeIn>
    </div>
  );
}

export default App;
