import React from "react";
import FadeIn from "react-fade-in";

function AdSearch() {
  return (
    <div className="search-container">
      <FadeIn>
        <form method="post">
          <div className="input-field">
            <input id="ad-search" type="text" name="ad-title" />
            <label htmlFor="ad-title">Keyword Search (By Title or Description | Leave Blank for Any)</label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="author" type="text" name="author" />
              <label htmlFor="author">Author (Leave Blank For Any)</label>
            </div>
            <div className="input-field col s6">
              <input id="ad-location" type="text" name="ad-location" />
              <label htmlFor="ad-location">Location (Leave Blank For Any)</label>
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
