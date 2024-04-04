import React, { useState, useEffect } from "react";
import AdSearch from "./adSearch";

function AdListings({ user }) {
  const [ads, setAds] = useState([]);

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .then(console.log(ads))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [ads]);

  // When clicking on either one of the buttons, the corresponding component will be shown or hidden
  return (
    <div>
      <h1>TMU Classifieds</h1>
      <AdSearch/>
      <div className="row">
        {ads.map((ad) => (
          <div key={ad._id} className="col s12 xl6">
            <fieldset>
              <h4>{ad.title}</h4>
              <p>
                <b>Posted by: </b>
                {ad.userEmail}
              </p>
              <p>
                <b>Category: </b>
                {ad.type}
              </p>
              <p>
                <b>Posted: </b>
                {ad.timePosted}
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
