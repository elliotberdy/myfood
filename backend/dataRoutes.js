// dataRoutes.js

require('dotenv').config();
const express = require("express");
const router = express.Router();
module.exports = router;

const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Define a route to handle inserting multiple rows of data
router.post('/api/data', (req, res) => {
  const { mood, foods, userid } = req.body;

  // Start a transaction
  pool.query('BEGIN', (error) => {
    if (error) {
      console.error('Error starting transaction:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Iterate through the list of foods and insert them one by one
    foods.forEach((food) => {
      const sql = 'INSERT INTO my_food_user_data (userid, food, mood) VALUES ($1, $2, $3)';
      const values = [userid, food, mood];

      pool.query(sql, values, (err) => {
        if (err) {
          // If an error occurs, roll back the transaction
          pool.query('ROLLBACK', (rollbackError) => {
            if (rollbackError) {
              console.error('Error rolling back transaction:', rollbackError);
            }
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        } else {
          // If successful, commit the transaction
          pool.query('COMMIT', (commitError) => {
            if (commitError) {
              console.error('Error committing transaction:', commitError);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log(`Inserted row of data: ${food}, ${mood}`);
            // Continue inserting the next food item
          });
        }
      });
    });

    // Send a response once all foods have been inserted (or an error occurred)
    res.json({ message: 'Data received and processed successfully' });
  });
});

// Define a route to get data for a specific userid
router.get('/api/data/:userid', (req, res) => {
  const userid = req.params.userid;

  // Perform a SELECT query to retrieve rows for the specified userid
  pool.query('SELECT * FROM my_food_user_data WHERE userid = $1', [userid], (err, result) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Define a route to get mood counts for a specific food and userid
router.get('/api/mood-counts/:userid/:food', (req, res) => {
  const userid = req.params.userid;
  const food = req.params.food;

  // Perform a SELECT query to retrieve mood counts for the specified food and userid
  pool.query('SELECT mood, COUNT(*) AS count FROM my_food_user_data WHERE userid = $1 AND food = $2 GROUP BY mood', [userid, food], (err, result) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});


// Define a route to get the top 5 foods by a specific mood and userid
router.get('/api/top-foods-by-mood/:userid/:mood', (req, res) => {
  const userid = req.params.userid;
  const mood = req.params.mood;

  // Perform a SELECT query to retrieve the top 5 foods for the specified mood and userid
  const sql = `
    SELECT food, COUNT(*) AS moodCount
    FROM my_food_user_data
    WHERE userid = $1 AND mood = $2
    GROUP BY food
    ORDER BY moodCount DESC
    LIMIT 5;
  `;

  pool.query(sql, [userid, mood], (err, result) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Check if the result is empty or has data
      if (result.rows.length === 0) {
        res.json([]); // Send an empty JSON response when no data is found
        console.log("No Data Yet");
      } else {
        res.json(result.rows); // Send the JSON data
      }      
    }
  });
});


