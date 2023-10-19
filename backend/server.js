//server.js

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// to parse JSON requests
app.use(bodyParser.json());
const login = require("./login"); // Require the login logic from login.js

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS my_food_user_data (
    id SERIAL PRIMARY KEY,
    userid INT,
    food TEXT,
    mood TEXT
  )
`,
  (error, results) => {
    if (error) {
      console.error("Error creating table:", error);
    } else {
      console.log("Database connected");
    }
  }
);

const frontendPath = path.join(__dirname, "../frontend");

// Serve static files from the frontend folder
app.use(express.static(frontendPath));

// Route to serve the login page (initial route)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login/index.html"));
});

// Route to handle the login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username/password combo exists
  login.checkUserExists(username, password, (error, userID) => {
    if (error) {
      console.error("Error:", error);
    } else {
      if (userID) {
        console.log("Username/password combo exists.");
        console.log("userid", userID);
        // If the user exists, retrieve the userid
        const userid = userID;
        res.json({ success: true, userID: userid });
      } else {
        console.log("Username/password combo does not exist.");
        // If the user doesn't exist, create a new userid and user entry
        login.createNewUser(username, password, (error, userID) => {
          if (error) {
            console.error("Error:", error);
          } else {
            console.log("New user created with userID:", userID);
            const newUserid = userID;
            res.json({ success: true, userID: newUserid });
          }
        });
      }
    }
  });
});

// Route to serve the index page
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index/index.html"));
});

// routes to deal with data
const dataRoutes = require("./dataRoutes");
app.use("/", dataRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => {
    pool.end();
    console.log("Database connection closed.");
    process.exit(0);
  });
});
