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
        <p><strong>Description:</strong> {ad.description}</p>
        <p><strong>Price:</strong> ${ad.price}</p>
        <p><strong>Location:</strong> {ad.location}</p>
        <p><strong>Posted by:</strong> {ad.userEmail}</p>
        {ad.images && ad.images.map((image, index) => (
          <img key={index} src={image} alt={`Ad image ${index + 1}`} style={{ width: "100%" }} />
        ))}
        {/* Add more ad details as needed */}
      </div>
    </FadeIn>
  );
}

export default AdDetail;
