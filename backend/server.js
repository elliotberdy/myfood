const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path'); 

// to parse JSON requests
app.use(bodyParser.json());

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database');
    }
  });
  
  // Create the table if it doesn't exist
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS mytable (
        ID INTEGER PRIMARY KEY,
        food TEXT,
        mood TEXT
      )
    `);
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



// Handle the process exit event to close the database connection
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});

// Handle other exit signals (e.g., Ctrl+C)
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Server has been closed.');
        process.exit();
    });
});
  