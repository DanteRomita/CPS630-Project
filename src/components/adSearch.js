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

  // Function to generate price options
  const generatePriceOptions = () => {
    const maxPrice = 1000; // Example maximum price
    const priceOptions = [];
    for (let i = 0; i <= maxPrice; i += 50) {
      priceOptions.push(i.toString());
    }
    return priceOptions;
  };

  const priceOptions = generatePriceOptions();

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
          <div className="search-form">
            <div className="search-inputs">
              <div className="search-bar">
                <input
                  id="keywords"
                  type="text"
                  name="keywords"
                  placeholder="Search..." // You can still have a text placeholder
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              <div>
                <select
                  id="author"
                  name="author"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Author
                  </option>
                  <option value="">Any</option>
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
                  <option value="" disabled hidden>
                    Location
                  </option>
                  <option value="">Any</option>
                  <option value="ONLINE">ONLINE</option>
                  <option value="Message">*Message for details*</option>
                  <option value="Kerr">Kerr Hall (KH)</option>
                  <option value="TRSM">
                    Ted Rogers School of Management (TRSM)
                  </option>
                  <option value="Communications">
                    Rogers Communications Centre (RCC)
                  </option>
                  <option value="Library">Library Building (LB)</option>
                  <option value="SLC">Student Learning Centre (SLC)</option>
                  <option value="ENG">Engineering Building (ENG)</option>
                  <option value="VIC">Victoria Building (VIC)</option>
                  <option value="Horsfall">
                    Sally Horsfall Eaton Centre for Studies in Community Health
                    (SHE)
                  </option>
                  <option value="MAC">Mattamy Athletic Centre (MAC)</option>
                  <option value="DCC">
                    Daphne Cockwell Health Sciences Complex (DCC)
                  </option>
                  <option value="CRS">Creative School (CRS)</option>
                  <option value="Common">Campus Common (CC)</option>
                  <option value="QD">Quad (QD)</option>
                </select>
              </div>
              <div>
                <select
                  id="lowest-price"
                  name="lowest-price"
                  value={lowestPrice}
                  onChange={(e) => setLowestPrice(e.target.value)}
                >
                  <option value="" disabled hidden>
                    -- $Low --
                  </option>
                  <option value="">Any</option>
                  {priceOptions.map((price, index) => (
                    <option key={`lowest-${index}`} value={price}>
                      ${price} CAD
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  id="highest-price"
                  name="highest-price"
                  value={highestPrice}
                  onChange={(e) => setHighestPrice(e.target.value)}
                >
                  <option value="" disabled hidden>
                    -- $High --
                  </option>
                  <option value="">Any</option>
                  {priceOptions.map((price, index) => (
                    <option key={`highest-${index}`} value={price}>
                      ${price} CAD
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="search-checkboxes">
              <div>
                <label
                  style={{ marginRight: "1vw" }}
                  className={ItemsWanted ? "checkbox-checked" : ""}
                >
                  <input
                    type="checkbox"
                    checked={ItemsWanted}
                    onChange={(e) => setItemsWanted(e.target.checked)}
                  />
                  <span className="search-checkbox">Items Wanted</span>
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </label>
              </div>
              <div>
                <label
                  style={{ marginRight: "1vw" }}
                  className={ItemsForSale ? "checkbox-checked" : ""}
                >
                  <input
                    type="checkbox"
                    checked={ItemsForSale}
                    onChange={(e) => setItemForSale(e.target.checked)}
                  />
                  <span className="search-checkbox">Items For Sale</span>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="search-icon"
                  />
                </label>
              </div>
              <div>
                <label
                  style={{ marginRight: "1vw" }}
                  className={AcademicServices ? "checkbox-checked" : ""}
                >
                  <input
                    type="checkbox"
                    checked={AcademicServices}
                    onChange={(e) => setAcademicServices(e.target.checked)}
                  />
                  <span className="search-checkbox">Academic Services</span>
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="search-icon"
                  />
                </label>
              </div>
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
