// dataRoutes.js

const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});



// Define a route to handle incoming data
router.post('/api/data', (req, res) => {

  const { mood, foods } = req.body;

  // Insert each food item with the associated mood into the database
  foods.forEach((food) => {
    db.run('INSERT INTO mytable (food, mood) VALUES (?, ?)', [food, mood], (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      } else {
        console.log(`Inserted data: Food: ${food}, Mood: ${mood}`);
      }
    });
  });

  res.json({ message: 'Data received and processed successfully' });
});

module.exports = router;

router.get('/api/data', (req, res) => {


  db.all('SELECT * FROM mytable', [], (err, rows) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
  
});


// Define a route to get mood counts for a specific food
router.get('/api/mood-counts/:food', (req, res) => {
  const food = req.params.food;

  db.all('SELECT mood, COUNT(*) AS count FROM mytable WHERE food = ? GROUP BY mood', [food], (err, rows) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});


// Define a route to get the top 5 foods by a specific mood
router.get('/api/top-foods-by-mood/:mood', (req, res) => {
  const mood = req.params.mood;

  const sql = `
    SELECT food, COUNT(*) AS moodCount
    FROM mytable
    WHERE mood = ?
    GROUP BY food
    ORDER BY moodCount DESC
    LIMIT 5;
  `;

  db.all(sql, [mood], (err, rows) => {
    if (err) {
      console.error('Error querying data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
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





