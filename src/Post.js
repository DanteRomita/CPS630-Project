import "./App.css";
import AdPostings from "./components/adPosting";
import FadeIn from "react-fade-in";

function Post({ user }) {

  return (
    <div className="App">
      <FadeIn>
        <AdPostings user={user}/>
      </FadeIn>
    </div>
  );
}

export default Post;
