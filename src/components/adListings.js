import React, { useState, useEffect } from "react";
import AdSearch from "./adSearch";
import { Link } from 'react-router-dom';

function AdListings({ user }) {
  const [ads, setAds] = useState([]);

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .then(ads)
      .catch((error) => console.error("Error fetching posts:", error));
  }, [ads]);

  // When clicking on either one of the buttons, the corresponding component will be shown or hidden
  return (
    <div>
      <h1>TMU Classifieds</h1>
      <AdSearch/>
      <div className="row">
        {ads.map((ad) => (
          <Link to={`/ads/${ad._id}`} key={ad._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="col s12 xl4">
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
                <p>
                  <b>Image: </b>
                  {ad.image}
                </p>
                <h5>Ad Description</h5>
                <p>{ad.description}</p>
                {ad.image && (
                  <img style={{ width: "100%" }} src={ad.image} alt="" />
                )}
              </fieldset>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdListings;
