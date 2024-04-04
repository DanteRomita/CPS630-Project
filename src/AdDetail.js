import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FadeIn from "react-fade-in/lib/FadeIn.js";

function AdDetail() {
  const { id } = useParams(); // This hooks allows you to access the ad ID from the URL
  const [ad, setAd] = useState(null);

  useEffect(() => {
    // Fetch the ad details from the server based on the ad ID
    fetch(`http://localhost:3001/api/ads/${id}`)
      .then(response => response.json())
      .then(data => setAd(data))
      .catch(error => console.error("Failed to fetch ad details:", error));
  }, [id]); // Depend on id so if it changes, we refetch

  if (!ad) return <p>Loading...</p>; // Display loading text until ad details are fetched

  return (
    <FadeIn>
      <div>
        <h1>{ad.title}</h1>
        <h5>Details</h5>
        <p>
          <b>Posted By: </b>{ad.userEmail}<br />
          <b>Price: </b>${ad.price.toFixed(2)}<br />
          <b>Location: </b>{ad.location}
        </p>
        <h5>Description</h5>
        <p>{ad.description}</p>
        <h5>Attached Images</h5>
        <br></br>
        <div className="container">
          <img className="center" src={ad.image} style={{'width': '75%'}} alt="Ad Image" />
        </div>

        {/* Add more ad details as needed */}
      </div>
    </FadeIn>
  );
}

export default AdDetail;
