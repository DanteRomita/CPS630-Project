import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDollarSign, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

function NewSearch() {
  const [keywords, setKeywords] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [location, setLocation] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [ItemsWanted, setItemsWanted] = useState(false);
  const [ItemsForSale, setItemForSale] = useState(false);
  const [AcademicServices, setAcademicServices] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(lowestPrice) > parseFloat(highestPrice)) {
      alert("Lowest price cannot be higher than the highest price");
      return;
    }

    console.log(
      `Keywords: ${keywords}\nAuthor Email: ${userEmail}\nLocation: ${location}\nLowest Price: ${lowestPrice}\nHighest Price: ${highestPrice}\nItems Wanted: ${ItemsWanted}\nItems For Sale: ${ItemsForSale}\nAcademic Services: ${AcademicServices}`
    );

    const formData = {
      keywords,
      userEmail,
      location,
      lowestPrice,
      highestPrice,
      ItemsWanted,
      ItemsForSale,
      AcademicServices,
    };

    try {
      await fetch("http://localhost:3001/api/ads/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error finding posts: ", error);
    }
  };

  return (
    <div className="search-container">
      <FadeIn>
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              id="keywords"
              type="text"
              name="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <label htmlFor="keywords">Keyword Search</label>
          </div>
          <div className="row">
            <div className="input-field col s12 l6">
              <input
                id="author"
                type="text"
                name="author"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <label htmlFor="author">Author Email</label>
            </div>
            <div className="input-field col s12 l6">
              <select
                id="location"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                
              </select>
              <label htmlFor="location">Location</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 l6">
              <input
                id="lowest-price"
                name="lowest-price"
                type="number"
                className="validate"
                min="0"
                step="0.01"
                value={lowestPrice}
                onChange={(e) => setLowestPrice(e.target.value)}
              />
              <label htmlFor="lowest-price">Lowest ($ CAD)</label>
            </div>
            <div className="input-field col s12 l6">
              <input
                id="highest-price"
                name="highest-price"
                type="number"
                className="validate"
                min="0"
                step="0.01"
                value={highestPrice}
                onChange={(e) => setHighestPrice(e.target.value)}
              />
              <label htmlFor="highest-price">Highest ($ CAD)</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 l4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={ItemsWanted}
                  onChange={(e) => setItemsWanted(e.target.checked)}
                />
                <span>Items Wanted</span>
                <FontAwesomeIcon icon={faSearch} style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}/>
              </label>
            </div>
            <div className="col s12 l4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={ItemsForSale}
                  onChange={(e) => setItemForSale(e.target.checked)}
                />
                <span>Items For Sale</span>
                <FontAwesomeIcon icon={faDollarSign} style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}/>
              </label>
            </div>
            <div className="col s12 l4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={AcademicServices}
                  onChange={(e) => setAcademicServices(e.target.checked)}
                />
                <span>Academic Services</span>
                <FontAwesomeIcon icon={faGraduationCap} style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}/>
              </label>
            </div>
          </div>
          <p className="center">
            <button className="btn-large waves-effect icon-link search-button btn" type="submit" style={{ 'fontSize': 'x-large' }}>Search</button>
          </p>
          <hr />
          
        </form>
      </FadeIn>
    </div>
  );
}

export default NewSearch;
