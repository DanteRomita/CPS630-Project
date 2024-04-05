import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSearch, faDollarSign, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import FadeIn from "react-fade-in/lib/FadeIn";

function DeletePost() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http:/beam.seven88.racing:55560/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/ads/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting the post");
        }
        setAds(ads.filter((ad) => ad._id !== id));
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const getIconForAdType = (type) => {
    switch(type) {
      case 'Items Wanted':
        return <FontAwesomeIcon icon={faSearch} className="ad-icon" />;
      case 'Items For Sale':
        return <FontAwesomeIcon icon={faDollarSign} className="ad-icon" />;
      case 'Academic Services':
        return <FontAwesomeIcon icon={faGraduationCap} className="ad-icon" />;
      default:
        return null;
    }
  };

  const getTitleWithIcon = (type, title) => {
    const icon = getIconForAdType(type);
    return (
      <div className="ad-title">
        <span className="title-text">{title}</span>
        {icon}
      </div>
    );
  };


  return (
    <FadeIn>
      <div className="ad-list">
        {ads.map((ad) => (
          <div key={ad._id} className="ad-item">
            <Link to={`/ads/${ad._id}`} className="ad-container">
              <div className="ad-image" style={{ backgroundImage: `url(${ad.image === "" ? "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" : ad.image})` }}>
              {getTitleWithIcon(ad.type, ad.title)}
                <div className="ad-price">${ad.price.toFixed(2)}</div>
              </div>
            </Link>
            <button id="deleteButton" onClick={() => handleDelete(ad._id)} className="delete-button btn waves-effect icon-link">
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "red" }} />
            </button>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

export default DeletePost;
