import React from "react";
import FadeIn from "react-fade-in";

function AdSearch() {
  return (
    <div className="search-container">
      <FadeIn>
        <form method="post">
          <div className="input-field">
            <input id="ad-search" type="text" name="ad-title" />
            <label htmlFor="ad-title">Search</label>
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
              />
              <label htmlFor="highest-price">Highest ($ CAD)</label>
            </div>
          </div>
          <div className="input-field">
            <input
              id="ad-location"
              type="text"
              name="ad-location"
              placeholder="Any"
            />
            <label htmlFor="ad-location">Location</label>
          </div>
          <h5 className="center">Select Category</h5>
          <div className="row">
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input type="checkbox" />
                <span>Items Wanted</span>
              </label>
            </div>
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input type="checkbox" />
                <span>Items For Sale</span>
              </label>
            </div>
            <div className="col s4">
              <label style={{ marginRight: "1vw" }}>
                <input type="checkbox" />
                <span>Academic Services</span>
              </label>
            </div>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}

export default AdSearch;
