const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));
const bin = http.createServer(app);
const wss = new WebSocket.Server({ server: bin });

const PORT = process.env.PORT || 3001;

// --- START OF GLOBAL CHAT ROOM SETUP ---

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = message.toString();
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// --- END OF GLOBAL CHAT ROOM SETUP ---

// --- START OF MONGOOSE SETUP ---

// Used 127.0.0.1 instead of localhost for IPv6 compatibility
mongoose
  .connect("mongodb://127.0.0.1:27017/adDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema for the ad posting
const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  type: String,
  images: [String], // Assuming images are stored as an array of URLs
  location: String,
  timestamp: { type: Date, default: Date.now }, // Automatically set to the current date and time
  // user: String // This could be a user ID or username, depending on your user management strategy
});

const adPosting = mongoose.model("adPosting", adSchema);

// --- END OF MONGOOSE SETUP ---

// --- START OF ROUTING SETUP ---

app.use(express.json());
app.use(cors());

// GET requests

let adSearchResults = undefined;

// Route to get all ad postings
app.get("/api/ads", async (req, res) => {
  try {
    if (adSearchResults) res.json(adSearchResults)
    else {
      const ads = await adPosting.find({});
      res.json(ads);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST requests

// Route to create a new ad posting
app.post("/api/ads", async (req, res) => {
  console.log(req.body);
  const { title, description, price, type, images, location, user } = req.body;

  try {
    // Create a new ad posting with all provided fields
    const newPost = new adPosting({
      title,
      description,
      price,
      type,
      images, // Assuming this is an array of image URLs from the request body
      location,
      user,
    });

    await newPost.save(); // Save the new ad posting to the database
    res.status(201).json(newPost); // Respond with the created ad posting
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send(err); // Send the error as the response
  }
});

// Route to search for ad postings
app.post("/api/ads/search", async (req, res) => {
  const {
    keywords,
    author, // add this once the user management system is implemented for ad posts
    location,
    lowestPrice,
    highestPrice,
    ItemsWanted,
    ItemsForSale,
    AcademicServices,
  } = req.body;

  console.log(req.body);

  const priceRange = {}; // price range object
  let category = [];

  // Set the default price range
  if (lowestPrice === "" && highestPrice === "") {
    priceRange.price = { $gte: 0.00, $lte: 10000000000000000000.00 };
  } else {
    if (lowestPrice !== "") {
      priceRange.price = { $gte: parseFloat(lowestPrice) };
    }
    if (highestPrice !== "") {
      priceRange.price = { ...priceRange.price, $lte: parseFloat(highestPrice) };
    }
  }

  // In the case where the user doesn't check any of the three checkboxes
  // it will default to search for all three
  if (
    ItemsWanted === false &&
    ItemsForSale === false &&
    AcademicServices === false
  ) {
    category = ["Items Wanted", "Items For Sale", "Academic Services"];
  } else {
    // Add the selected categories to the category array
    if (ItemsWanted === true) category.push("Items Wanted");
    if (ItemsForSale === true) category.push("Items For Sale");
    if (AcademicServices === true) category.push("Academic Services");
  }

  console.log(category);
  console.log(priceRange);

  try {
    // Needs some work (or not)

    // FORMAT:
    // {
    //   $or: [
    //     { title: { $regex: keywords, $options: "i" } },
    //     { description: { $regex: keywords, $options: "i" } },
    //   ],
    //   author: { $regex: author, $options: "i" },
    //   location: { $regex: location, $options: "i" },
    //   price: priceRange.price,
    //   type: { $in: category },
    // }
    adSearchResults = await adPosting.find({
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
      //   author: { $regex: author, $options: "i" },
      location: { $regex: location, $options: "i" },
      price: priceRange.price,
      type: { $in: category },
    });
    console.log(`AD RESULTS: ${adSearchResults}`);
    console.log(`Number of ADS: ${adSearchResults.length}`);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --- END OF ROUTING SETUP ---

// Start the server
bin.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
