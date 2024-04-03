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

// Route to get all ad postings
app.get("/api/ads", async (req, res) => {
  try {
    const ads = await adPosting.find({});
    res.json(ads);
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
    author,
    location,
    lowestPrice,
    highestPrice,
    itemsWanted,
    itemsForSale,
    academicServices,
  } = req.body;

  const searchCriteria = {};

  if (keywords) {
    searchCriteria.keywords = keywords;
  }
  if (author) {
    searchCriteria.author = author;
  }
  if (location) {
    searchCriteria.location = location;
  }
  if (lowestPrice !== undefined) {
    searchCriteria.price = { $gte: lowestPrice };
  }
  if (highestPrice !== undefined) {
    searchCriteria.price = { ...searchCriteria.price, $lte: highestPrice };
  }
  if (itemsWanted !== undefined) {
    searchCriteria.itemsWanted = itemsWanted;
  }
  if (itemsForSale !== undefined) {
    searchCriteria.itemsForSale = itemsForSale;
  }
  if (academicServices !== undefined) {
    searchCriteria.academicServices = academicServices;
  }

  try {
    const ads = await adPosting.find(searchCriteria);
    res.json(ads);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --- END OF ROUTING SETUP ---

// Start the server
bin.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
