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
      <h1>Metropolitan Market</h1>
      <AdSearch/>
      <div className="ad-list">
        {ads.map((ad) => (
          <Link to={`/ads/${ad._id}`} key={ad._id} className="ad-container">
            <div className="ad-image" style={{ backgroundImage: `url(${ad.image})` }}>
              <div className="ad-title">{ad.title}</div>
              <div className="ad-price">${ad.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdListings;
