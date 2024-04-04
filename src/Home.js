import "./App.css";
import AdListings from "./components/adListings";
import FadeIn from "react-fade-in";

function Home({ user }) {

  return (
    <div className="App">
      <FadeIn>
        <AdListings user={user}/>
      </FadeIn>
    </div>
  );
}

export default Home;
