import React, { useState } from "react";
import FadeIn from "react-fade-in";

function NewPost({ user }) {
  const [title, setTitle] = useState("Untitled Ad");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [type, setType] = useState("Items Wanted");
  const [location, setLocation] = useState("ONLINE");
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'twup5uph');

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dp7bfbfix/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            setImageURL(data.secure_url); // Set the image URL in state only after successful upload
            console.log("Uploaded image");
            return data.secure_url;
        }
    } catch (error) {
        console.error('Error uploading the image:', error);
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
      alert("Title and Location cannot be empty. Please provide the necessary details.");
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
      price,
      type,
      image: uploadedImageURL,
      location,
      userEmail: user.email,
    };

    try {
      const response = await fetch("http://localhost:3001/api/ads", {
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
    <div className="pageContent">
      <FadeIn>
        <h1>Add a New Ad</h1>
        <form id="newAd" onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              placeholder="Enter Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
            rows="10"
              style={{ resize: "vertical" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Price ($):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0.00"
              step="0.01"
            />
          </div>
          <h5 className="center">Select Category</h5>
          <div className="row center-align">
            <div className="col s4">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="Items Wanted"
                  checked={type === "Items Wanted"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Items Wanted</span>
              </label>
            </div>
            <div className="col s4">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="Items For Sale"
                  checked={type === "Items For Sale"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Items For Sale</span>
              </label>
            </div>
            <div className="col s4">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="Academic Services"
                  checked={type === "Academic Services"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Academic Services</span>
              </label>
            </div>
          </div>
          <div>
            <label>Image:</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              placeholder="Enter Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit">Add Ad</button>
        </form>
      </FadeIn>
    </div>
  );
}

export default NewPost;
