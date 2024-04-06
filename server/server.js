const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.static("build"));
const bin = http.createServer(app);
const wss = new WebSocket.Server({ server: bin });

const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '166802367480-rqq3532mvaqamifrp1ouqqjl6f4a1god.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/';
const googleClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dp7bfbfix', 
  api_key: '498813646762871', 
  api_secret: 'EGZV76xI74yiPM9ufEASpFwqOrs' 
});

const PORT = 3001;

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

// --- START OF MONGODB SETUP ---

const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require("express");
const uri = "mongodb+srv://danteromita:4GK4wWtNCQ0xau27@cluster0.eiwryal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/* Connection String:
mongodb+srv://danteromita:4GK4wWtNCQ0xau27@cluster0.eiwryal.mongodb.net/
*/

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runWithRetry() {
  let maxRetries = 3;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return; // Exit the loop if the connection is successful
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      currentRetry++;
      if (currentRetry < maxRetries) {
        console.log(`Retrying connection... (Retry ${currentRetry} of ${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      } else {
        throw new Error('Failed to connect to MongoDB after multiple attempts');
      }
    }
  }
}

runWithRetry().catch(console.dir);

// --- END OF MONGODB SETUP ---

// --- START OF ROUTING SETUP ---

app.use(express.json());
app.use(cors());

// GET requests

let adSearchResults = undefined;

// Route to get all ad postings using MongoDB driver
app.get("/api/ads", async (req, res) => {
  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');
    let ads = await collection.find({}).toArray();

    if (adSearchResults) {
      res.json(adSearchResults);
      // console.log(`Check get("/api/ads") to uncomment this. Number of search results: ${adSearchResults.length}`);
    }
    else {
      res.json(ads);
      //console.log(`Check get("/api/ads") to uncomment this. Number of ads: ${ads.length}`);
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})

app.get('/api/auth', (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(url);
});

// Route to get all users
app.get("/api/oauthToken", async (req, res) => {
  res.json({
    oauthtoken:
      "166802367480-rqq3532mvaqamifrp1ouqqjl6f4a1god.apps.googleusercontent.com",
  });
});

// Route to get all emails
app.get("/api/users", async (req, res) => {
  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('useremails');

    let emails = await collection.find({}).toArray();
    res.json(emails);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get an ad by ID
app.get("/api/ads/:id", async (req, res) => {
  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');

    const ad = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!ad) {
      return res.status(404).send("Ad not found");
    }
    res.json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// POST requests

// Route to upload an image to Cloudinary
app.post('/api/uploadImage', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream({
      upload_preset: 'twup5uph'
    }, (error, result) => {
      if (error) throw error;
      res.json({ secure_url: result.secure_url });
    });

    // Get the file buffer from multer
    const fileBuffer = req.file.buffer;
    // Use the buffer to upload the file to Cloudinary
    result.end(fileBuffer);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).send('Error uploading image');
  }
});

// POST requests

// Route to create new users in the DB or check existing user
app.post('/api/newUser', async (req, res) => {
  const { email, admin, banned } = req.body;

  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('useremails');

    // Check if the user already exists
    const existingUser = await collection.findOne({ email: email });

    if (existingUser) {
      // User already exists, don't add to the database
      console.log(`User ${email} already exists in the database.`);
      res.status(409).json({ message: 'User already exists' }); // 409 Conflict
    } else {
      // User doesn't exist, create a new one
      let newUser = {
        email,
        admin,
        banned
      };

      await collection.insertOne(newUser); // Save the new user to the database
      console.log(`New user ${email} added to the database.`);
      res.status(201).json(newUser); // 201 Created
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send(err); // Send the error as the response
  }
});

// Toggle Admin Status
app.post('/api/users/toggleAdmin', async (req, res) => {
  const { email } = req.body;

  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('useremails');

    const user = await collection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the admin field
    user.admin = !user.admin;
    await collection.updateOne({ email: email }, { $set: { admin: user.admin } });

    res.json({ message: 'Admin status updated', admin: user.admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle Ban Status
app.post('/api/users/toggleBan', async (req, res) => {
  const { email } = req.body;

  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('useremails');

    const user = await collection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the banned field
    user.banned = !user.banned;
    await collection.updateOne({ email: email }, { $set: { banned: user.banned } });

    res.json({ message: 'Ban status updated', banned: user.banned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to create a new ad posting
app.post('/api/ads', async (req, res) => {
  let { title, description, price, type, image, location, userEmail } = req.body;

  try {
    let timePosted = formatDate(Date.now());

    // Create a new ad posting with all provided fields
    let newPost = {
      title,
      description,
      price,
      type,
      image,
      location,
      userEmail,
      timePosted
    };

    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');

    await collection.insertOne(newPost); // Save the new ad posting to the database
    console.log(`New Post Created`)

    res.status(201).json(newPost); // Respond with the created ad posting
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send(err); // Send the error as the response
  }
});

// Route to search for ad postings
app.post("/api/ads/search", async (req, res) => {
  // console.log(req.body)
  let {
    keywords,
    userEmail,
    location,
    lowestPrice,
    highestPrice,
    ItemsWanted,
    ItemsForSale,
    AcademicServices,
  } = req.body;

  // console.log(req.body);

  let priceRange = {}; // price range object
  let category = [];

  // Set the default price range
  if (lowestPrice === "" && highestPrice === "") {
    priceRange.price = { $gte: 0.0, $lte: 10000000000000000000.0 };
  } else {
    if (lowestPrice !== "") {
      priceRange.price = { $gte: parseFloat(lowestPrice) };
    }
    if (highestPrice !== "") {
      priceRange.price = {
        ...priceRange.price,
        $lte: parseFloat(highestPrice),
      };
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

  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');

    if (keywords === '' && userEmail === '' && location === '' && lowestPrice === '' && highestPrice === '' && ItemsWanted === false && ItemsForSale === false && AcademicServices === false) {
      adSearchResults = await collection.find({}).toArray();
      // adSearchResults = undefined;
    } else {
      // Search for ads that match the provided keywords
      adSearchResults = await collection.find({
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { description: { $regex: keywords, $options: "i" } },
        ],
        userEmail: { $regex: userEmail, $options: "i" },
        location: { $regex: location, $options: "i" },
        price: priceRange.price,
        type: { $in: category },
      }).sort({ price: 1 }).toArray();
    }
    // console.log(`AD SEARCH RESULTS: ${adSearchResults}`);
    // console.log(`AD SEARCH RESULTS LENGTH: ${adSearchResults.length}`);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --- END OF ROUTING SETUP ---

// --- START OF ADMIN ACTIONS ---

// Endpoint to delete a post by ID
app.delete("/api/ads/:id", async (req, res) => {
  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');

    await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Endpoint to update a post by ID
app.put("/api/ads/:id", async (req, res) => {
  try {
    await client.connect(); // Connect the client if not already connected
    let database = client.db('sample_mflix');
    let collection = database.collection('adpostings');

    const updatedAd = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedAd);
  } catch (error) {
    res.status(500).send(error);
  }
});

// --- END OF ADMIN ACTIONS ---

// Start the server
bin.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function formatDate(date) {
  let d = new Date(date);
  let day = String(d.getDate()).padStart(2, "0");
  // Array of month names
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Get the month name using the month number as an index
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${year}`;
}
