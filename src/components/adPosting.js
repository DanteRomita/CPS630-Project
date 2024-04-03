import React, { useState } from "react";
import FadeIn from "react-fade-in";

function NewPost({ user }) {
  const [title, setTitle] = useState("Untitled Ad");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [type, setType] = useState("Items Wanted");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("ONLINE");

  const handleImageChange = (e) => {
    // NEEDS WORK
    // Convert each file to an object URL and update the images state
    const filesArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(filesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (title.trim() === "") {
      alert("Title cannot be empty. Please provide a title.");
      return; // Exit the function early if title is empty
    } else if (location.trim() === "") {
      alert("Location cannot be empty. Please provide a location.");
      return; // Exit the function early if location is empty
    }
    
    let userEmail = user.email;

    const formData = {
      title,
      description,
      price,
      type,
      images,
      location,
      userEmail,
    };

    try {
      const response = await fetch("http://localhost:3001/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(formData));

      if (!response.ok) {
        throw new Error("Failed to add post");
      } else {
        setTitle("");
        setDescription("");
        setPrice("");
        setType("Items Wanted");
        setImages([]);
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
        <h2>Add a New Ad</h2>
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
            <label>Images:</label><br />
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
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
