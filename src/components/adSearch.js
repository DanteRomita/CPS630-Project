import React, { useState } from "react";
import FadeIn from "react-fade-in";

function NewSearch() {
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
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
      `Keywords: ${keywords}\nAuthor: ${author}\nLocation: ${location}\nLowest Price: ${lowestPrice}\nHighest Price: ${highestPrice}\nItems Wanted: ${ItemsWanted}\nItems For Sale: ${ItemsForSale}\nAcademic Services: ${AcademicServices}`
    );

    const formData = {
      keywords,
      author,
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
          <p className="center">
            If all checkboxes are unchecked, ads of all categories will be
            returned.
          </p>
          <div className="row">
            <div className="col s4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={ItemsWanted}
                  onChange={(e) => setItemsWanted(e.target.checked)}
                />
                <span>Items Wanted</span>
              </label>
            </div>
            <div className="col s4 center">
              <label style={{ marginRight: "1vw" }}>
                <input
                  type="checkbox"
                  value={ItemsForSale}
                  onChange={(e) => setItemForSale(e.target.checked)}
                />
                <span>Items For Sale</span>
              </label>
            </div>
            <div className="col s4 center">
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
