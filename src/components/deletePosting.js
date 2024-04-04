import React, { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function DeletePost() {
  const [ads, setAds] = useState([]);

  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/ads/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting the post");
        }
        // Remove the deleted post from state if deletion is successful
        setAds(ads.filter((ad) => ad._id !== id));
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="ad-list">
      {ads.map((ad) => (
        <div key={ad._id} className="ad-item">
          <Link to={`/ads/${ad._id}`} className="ad-container">
            <div className="ad-image" style={{ backgroundImage: `url(${ad.image})` }}>
              <div className="ad-title">{ad.title}</div>
              <div className="ad-price">${ad.price.toFixed(2)}</div>
            </div>
          </Link>
          <button
            id="deleteButton"
            onClick={() => handleDelete(ad._id)}
            className="delete-button btn waves-effect icon-link"
          >
            <FontAwesomeIcon icon={faTrashCan} style={{ color: "red" }} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DeletePost;
