import React, { useState } from "react";
import FadeIn from "react-fade-in";

function NewSearch() {

  const [searchFormData, setSearchFormData] = useState({
    keywords: "",
    author: "",
    location: "",
    lowestPrice: "",
    highestPrice: "",
    ItemsWanted: false,
    ItemsForSale: false,
    AcademicServices: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({ ...searchFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(searchFormData.lowestPrice) > parseFloat(searchFormData.highestPrice)) {
      alert("Lowest price cannot be higher than the highest price");
      return
    }

    console.log(
      `Keywords: ${searchFormData.keywords}
Author: ${searchFormData.author}
Lowest Price: ${searchFormData.lowestPrice}
Highest Price: ${searchFormData.highestPrice}
Items Wanted: ${searchFormData.ItemsWanted}
Items For Sale: ${searchFormData.ItemsForSale}
Academic Services: ${searchFormData.AcademicServices}`
    );

    try {
      await fetch("http://localhost:3001/api/ads/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchFormData),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error finding posts:", error);
    }

    alert("Search submitted successfully! Scroll down to view results.");
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
              value={searchFormData.keywords}
              onChange={handleInputChange}
            />
            <label htmlFor="keywords">Keyword Search*</label>
            <p>*By Title or Description. Leave Blank for Any</p>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="author"
                type="text"
                name="author"
                value={searchFormData.author}
                onChange={handleInputChange}
              />
              <label htmlFor="author">Author (Leave Blank For Any)</label>
            </div>
            <div className="input-field col s6">
              <input
                id="location"
                type="text"
                name="location"
                value={searchFormData.location}
                onChange={handleInputChange}
              />
              <label htmlFor="location">Location (Leave Blank For Any)</label>
            </div>
          </div>
          <h6>Price Range (Leave A Field Blank for Any)</h6>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="lowest-price"
                name="lowest-price"
                type="number"
                className="validate"
                min="0"
                step="0.01"
                value={searchFormData.lowestPrice}
                onChange={handleInputChange}
              />
              <label htmlFor="lowest-price">Lowest ($ CAD)</label>
            </div>
            <div className="input-field col s6">
              <input
                id="highest-price"
                name="highest-price"
                type="number"
                className="validate"
                min="0"
                step="0.01"
                value={searchFormData.highestPrice}
                onChange={handleInputChange}
              />
              <label htmlFor="highest-price">Highest ($ CAD)</label>
            </div>
          </div>
          <h5 className="center">Select Category</h5>
          <p class="center">If all checkboxes are unchecked, ads of all categories will be returned.</p>
          <div className="row">
            <div className="col s4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={searchFormData.ItemsWanted}
                  onChange={handleInputChange}
                />
                <span>Items Wanted</span>
              </label>
            </div>
            <div className="col s4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={searchFormData.ItemsForSale}
                  onChange={handleInputChange}
                />
                <span>Items For Sale</span>
              </label>
            </div>
            <div className="col s4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={searchFormData.AcademicServices}
                  onChange={handleInputChange}
                />
                <span>Academic Services</span>
              </label>
            </div>
          </div>
          <button type="submit">Search</button>
        </form>
      </FadeIn>
    </div>
  );
}

export default NewSearch;
