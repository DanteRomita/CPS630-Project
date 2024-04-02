const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

// Used 127.0.0.1 instead of localhost for IPv6 compatibility
mongoose.connect('mongodb://127.0.0.1:27017/adDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error("MongoDB connection error:", err));

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

const adPosting = mongoose.model('adPosting', adSchema);

app.use(express.json());
app.use(cors());

// GET requests

// Route to get all ad postings
app.get('/api/ads', async (req, res) => {
    try {
        const ads = await adPosting.find({});
        res.json(ads);
    } catch (err) {
        res.status(500).send(err);
    }
});


// POST requests

// Route to create a new ad posting
app.post('/api/ads', async (req, res) => {
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
            user
        });

        await newPost.save(); // Save the new ad posting to the database
        res.status(201).json(newPost); // Respond with the created ad posting
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send(err); // Send the error as the response
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
