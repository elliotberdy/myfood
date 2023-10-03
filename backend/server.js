//server.js

require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const { Pool } = require('pg'); 

// to parse JSON requests
app.use(bodyParser.json());

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // PostgreSQL default port
});

// Create the user_data table
pool.query(`
  CREATE TABLE IF NOT EXISTS my_food_user_data (
    id SERIAL PRIMARY KEY,
    userid INT,
    food TEXT,
    mood TEXT
  )
`, (error, results) => {
  if (error) {
    console.error('Error creating table:', error);
  } else {
    console.log('Database connected');
  }
});

const frontendPath = path.join(__dirname, '../frontend');

// Serve static files from the frontend folder
app.use(express.static(frontendPath));

// routes to deal with data
const dataRoutes = require("./dataRoutes");
app.use("/", dataRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





  