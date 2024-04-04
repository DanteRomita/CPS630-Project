import React, { useState, useEffect } from "react";
import AdSearch from "./adSearch";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDollarSign, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

function AdListings() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [ads]);

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

  return (
    <div>
      <h1>Metropolitan Market</h1>
      <AdSearch />
      <div className="ad-list">
        {ads.map((ad) => (
          <Link to={`/ads/${ad._id}`} key={ad._id} className="ad-container">
            <div className="ad-image" style={{ backgroundImage: `url(${ad.image === "" ? "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" : ad.image})` }}>
              {getIconForAdType(ad.type)}
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
