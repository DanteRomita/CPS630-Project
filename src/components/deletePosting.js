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

  // When clicking on either one of the buttons, the corresponding component will be shown or hidden
  return (
    <div>
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
                <h5>Ad Description</h5>
                <p>{ad.description}</p>
                <button
                  id="deleteButton"
                  onClick={() => handleDelete(ad._id)}
                  className="btn waves-effect icon-link center"
                >
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: "red" }} />
                </button>

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

export default DeletePost;
