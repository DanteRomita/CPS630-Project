import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMapMarkerAlt,
  faInfoCircle,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function NewPost({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [type, setType] = useState("Items Wanted");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [imageURL, setImageURL] = useState("");

  // Uploads image from the ad posting to cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "twup5uph");

    try {
      const response = await fetch(`/api/uploadImage`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setImageURL(data.secure_url);
        return data.secure_url;
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // Update the state with the selected file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (title.trim() === "" || location.trim() === "") {
      alert(
        "Title and Location cannot be empty. Please provide the necessary details."
      );
      return;
    }

    let uploadedImageURL = imageURL; // Use existing imageURL if available
    if (selectedFile) {
      uploadedImageURL = await handleImageUpload(selectedFile); // Upload the image and get the URL
      if (!uploadedImageURL) {
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    const formData = {
      title,
      description,
      price: parseFloat(price),
      type,
      image: uploadedImageURL,
      location,
      userEmail: user.email,
    };

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      } else {
        setTitle("");
        setDescription("");
        setPrice("");
        setType("Items Wanted");
        setSelectedFile(null); // Reset file selection
        setImageURL(""); // Clear the imageURL state
        setLocation("");
        alert("Ad posted successfully!");
      }
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  return (
    <div className="post-container">
      <FadeIn>
        <h1>Post a New Ad</h1>
        <form id="newAdForm" onSubmit={handleSubmit}>
          <div className="post-inputs">
            <div className="post-input">
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="post-input">
              <FontAwesomeIcon icon={faInfoCircle} className="post-icon" />
              <textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="post-input">
              Price{" "}
              <FontAwesomeIcon icon={faDollarSign} className="post-icon" />
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="post-input">
              Location{" "}
              <FontAwesomeIcon icon={faMapMarkerAlt} className="post-icon" />
              <select
                id="location"
                name="location"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select a Location</option>
                <option value="ONLINE">ONLINE</option>
                <option value="*Message for details*">
                  *Message for details*
                </option>
                <option value="Kerr Hall (KH)">Kerr Hall (KH)</option>
                <option value="Ted Rogers School of Management (TRSM)">
                  Ted Rogers School of Management (TRSM)
                </option>
                <option value="Rogers Communications Centre (RCC)">
                  Rogers Communications Centre (RCC)
                </option>
                <option value="Library Building (LB)">
                  Library Building (LB)
                </option>
                <option value="Student Learning Centre (SLC)">
                  Student Learning Centre (SLC)
                </option>
                <option value="Engineering Building (ENG)">
                  Engineering Building (ENG)
                </option>
                <option value="Victoria Building (VIC)">
                  Victoria Building (VIC)
                </option>
                <option value="Sally Horsfall Eaton Centre for Studies in Community Health (SHE)">
                  Sally Horsfall Eaton Centre for Studies in Community Health
                  (SHE)
                </option>
                <option value="Mattamy Athletic Centre (MAC)">
                  Mattamy Athletic Centre (MAC)
                </option>
                <option value="Daphne Cockwell Health Sciences Complex (DCC)">
                  Daphne Cockwell Health Sciences Complex (DCC)
                </option>
                <option value="Creative School (CRS)">
                  Creative School (CRS)
                </option>
                <option value="Campus Common (CC)">Campus Common (CC)</option>
                <option value="Quad (QD)">Quad (QD)</option>
              </select>
            </div>

            <div className="post-input">
              <FontAwesomeIcon icon={faImage} className="post-icon" />
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="post-input">
              Type
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Items Wanted">Items Wanted</option>
                <option value="Items For Sale">Items For Sale</option>
                <option value="Academic Services">Academic Services</option>
              </select>
            </div>
          </div>

          <button type="submit" className="post-submit-btn btn">
            Post Ad
          </button>
        </form>
      </FadeIn>
    </div>
  );
}

export default NewPost;
