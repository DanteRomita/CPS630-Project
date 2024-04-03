import React, { useState, useEffect } from "react";
import AdPostings from "./adPosting";
import AdSearch from "./adSearch";

function AdListings() {
  const [adPostingShown, setAdPostingShown] = useState(false);
  const [adSearchShown, setAdSearchShown] = useState(true);
  const [ads, setAds] = useState([]);

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // When clicking on either one of the buttons, the corresponding component will be shown or hidden
  return (
    <div>
      <h1>TMU Classifieds</h1>
      <div className="btn-container">
        <p>
          <button
            className="btn waves-effect center"
            style={{ fontSize: "x-large" }}
            onClick={() => {
              setAdPostingShown(false);
              setAdSearchShown(true);
            }}
          >
            Search
          </button>
        </p>

        <p>
          <button
            className="btn waves-effect orange darken-4 center"
            style={{ fontSize: "x-large" }}
            onClick={() => {
              setAdPostingShown(true);
              setAdSearchShown(false);
            }}
          >
            Post an Ad
          </button>
        </p>
      </div>
      {adSearchShown && <AdSearch />}
      {adPostingShown && <AdPostings />}
      <h2>Explore</h2>
      <div className="center" style={{ margin: "1.5px 0" }}>
        <button
          className="btn waves-effect"
          style={{ fontSize: "x-large", margin: "1.5px 0" }}
        >
          Show All Items
        </button>
        <button
          className="btn waves-effect"
          style={{ fontSize: "x-large", margin: "1.5px 0" }}
        >
          Items Wanted
        </button>
        <button
          className="btn waves-effect"
          style={{ fontSize: "x-large", margin: "1.5px 0" }}
        >
          Items For Sale
        </button>
        <button
          className="btn waves-effect"
          style={{ fontSize: "x-large", margin: "1.5px 0" }}
        >
          Academic Services
        </button>
      </div>

      <h2>The Classifieds</h2>
      <div className="row">
        {ads.map((ad) => (
          <div key={ad._id} className="col s12 xl6">
            <fieldset>
              <h4>{ad.title}</h4>
              <p>
                <b>Posted by: </b>
                {ad.user}
              </p>
              <p>
                <b>Category: </b>
                {ad.type}
              </p>
              <p>
                <b>Price: </b>$ {ad.price}
              </p>
              <p>
                <b>Location: </b>
                {ad.location}
              </p>
              <h5>Ad Description</h5>
              <p>{ad.description}</p>
              {ad.image && (
                <img style={{ width: "100%" }} src={ad.image} alt="" />
              )}
            </fieldset>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdListings;
