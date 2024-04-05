import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FadeIn from "react-fade-in/lib/FadeIn.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDollarSign,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

function AdDetail({ user }) {
  const { id } = useParams(); // This hooks allows you to access the ad ID from the URL
  const [ad, setAd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the ad details from the server based on the ad ID
    fetch(`/api/ads/${id}`)
      .then(response => response.json())
      .then(data => setAd(data))
      .catch(error => console.error("Failed to fetch ad details:", error));
  }, [id]); // Depend on id so if it changes, we refetch

  const categoryIcons = {
    'Items Wanted': faSearch,
    'Items For Sale': faDollarSign,
    'Academic Services': faGraduationCap,
  };


  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/ads/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting the post");
        }
        // Remove the deleted post from state if deletion is successful
        setAd(null);
        navigate('/')
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  }

  if (!ad) return <h3 className="center">Ad Not Found. <Link to="/">Return to Home</Link></h3>; // Display loading text until ad details are fetched

  return (
    <FadeIn>
      <div>
        <h1>{ad.title}</h1>
        <h5>Category</h5>
        <p>
          <b>
            {ad.type} <FontAwesomeIcon icon={categoryIcons[ad.type]} />
          </b>
        </p>
        {
          user.email === ad.userEmail &&
          <button
            className='btn waves-effect red'
            style={{ 'fontSize': 'x-large' }}
            onClick={() => handleDelete(ad._id)}
          >
            Delete Post
          </button>
        }
        <h5>Details</h5>
        <p>
          <b>Posted By: </b>{ad.userEmail}<br />
          <b>Price: </b>${ad.price.toFixed(2)}<br />
          <b>Location: </b>{ad.location}
        </p>
        {ad.description && <div><h5>Description</h5> <p>{ad.description}</p></div>}
        {ad.image &&
          <div>
            <h5>Attached Image</h5>
            <br></br>
            <div className="container">
              {ad.image && <img className="center" src={ad.image} style={{ 'width': '75%' }} alt="Ad Image" />}
            </div>
          </div>
        }
        {/* Add more ad details as needed */}
      </div>
    </FadeIn>
  );
}

export default AdDetail;
