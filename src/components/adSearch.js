import React, { useState } from "react";
import FadeIn from "react-fade-in";

function NewSearch() {
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [ItemsWanted, setItemsWanted] = useState(false);
  const [ItemsForSale, setsItemForSale] = useState(false);
  const [AcademicServices, setAcademicServices] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Items Wanted: ${ItemsWanted}\nItems For Sale: ${ItemsForSale}\nAcademic Services: ${AcademicServices}`);
  }

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
            <label htmlFor="keywords">Keyword Search*</label>
            <p>*By Title or Description. Leave Blank for Any</p>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
              id="author"
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              />
              <label htmlFor="author">Author (Leave Blank For Any)</label>
            </div>
            <div className="input-field col s6">
              <input
              id="location"
              type="text"
              name="location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
                value={lowestPrice}
                onChange={(e) => setLowestPrice(e.target.value)}
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
                value={highestPrice}
                onChange={(e) => setHighestPrice(e.target.value)}
              />
              <label htmlFor="highest-price">Highest ($ CAD)</label>
            </div>
          </div>
          <h5 className="center">Select Category</h5>
          <div className="row">
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input
                type="checkbox" 
                value={ItemsWanted}
                onChange={(e) => setItemsWanted(e.target.checked)}
                />
                <span>Items Wanted</span>
              </label>
            </div>
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input
                type="checkbox"
                value={ItemsForSale}
                onChange={(e) => setsItemForSale(e.target.checked)}
                />
                <span>Items For Sale</span>
              </label>
            </div>
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input
                type="checkbox"
                value={AcademicServices}
                onChange={(e) => setAcademicServices(e.target.checked)}
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
