import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDollarSign,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

function NewSearch() {
  const [keywords, setKeywords] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [location, setLocation] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [ItemsWanted, setItemsWanted] = useState(false);
  const [ItemsForSale, setItemForSale] = useState(false);
  const [AcademicServices, setAcademicServices] = useState(false);
  const [authorEmails, setAuthorEmails] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setAuthorEmails(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const generatePriceOptions = () => {
    const maxPrice = 250;
    const priceOptions = [];
    for (let i = 0; i <= maxPrice; i += 50) {
      priceOptions.push(`${i} - ${i + 50}`);
    }
    return priceOptions;
  };

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
          <div className="search-Inputs">
            <div className="search-bar">
              <input
                id="keywords"
                type="text"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <label htmlFor="keywords">Keyword Search</label>
            </div>
            <div>
              <select
                id="author"
                name="author"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              >
                <option value="">Author</option>
                <option value="">None</option>
                {authorEmails.map((email) => (
                  <option key={email.email} value={email.email}>
                    {email.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="location"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Location</option>
                <option value="">None</option>
                <option value="KH">Kerr Hall (KH)</option>
                <option value="TRSM">
                  Ted Rogers School of Management (TRSM)
                </option>
                <option value="RCC">Rogers Communications Centre (RCC)</option>
                <option value="LB">Library Building (LB)</option>
                <option value="SLC">Student Learning Centre (SLC)</option>
                <option value="ENG">Engineering Building (ENG)</option>
                <option value="VIC">Victoria Building (VIC)</option>
                <option value="SLC">
                  Sheldon & Tracy Levy Student Learning Centre (SLC)
                </option>
                <option value="SHE">
                  Sally Horsfall Eaton Centre for Studies in Community Health
                  (SHE)
                </option>
                <option value="MAC">Mattamy Athletic Centre (MAC)</option>
                <option value="DCC">
                  Daphne Cockwell Health Sciences Complex (DCC)
                </option>
                <option value="CRS">Creative School (CRS)</option>
                <option value="CC">Campus Common (CC)</option>
                <option value="QD">Quad (QD)</option>
              </select>
            </div>
            <select
              id="price-range"
              name="price-range"
              onChange={(e) => {
                if (e.target.value === "") {
                  setLowestPrice("0"); 
                  setHighestPrice("10000");
                } else {
                  const [lowest, highest] = e.target.value.split(' - ');
                  setLowestPrice(lowest);
                  setHighestPrice(highest);
                }
              }}
            >
              <option value="">Select Price Range</option>
              <option value="">None</option>
              {generatePriceOptions().map((range, index) => (
                <option key={index} value={range}>
                  ${range} CAD
                </option>
              ))}
            </select>
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
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}
                />
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
                <FontAwesomeIcon
                  icon={faDollarSign}
                  style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}
                />
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
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ paddingLeft: "0.5vw", fontSize: "1.5vw" }}
                />
              </label>
            </div>
          </div>
          <p className="center">
            <button
              className="btn-large waves-effect icon-link search-button btn"
              type="submit"
              style={{ fontSize: "x-large" }}
            >
              Search
            </button>
          </p>
          <hr />
        </form>
      </FadeIn>
    </div>
  );
}

export default NewSearch;
