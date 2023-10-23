require("dotenv").config();
const { Pool } = require("pg");

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to insert data for a specific food and mood
function insertData(userid, food, mood) {
  const query =
    "INSERT INTO my_food_user_data (userid, food, mood) VALUES ($1, $2, $3)";
  pool.query(query, [userid, food, mood], (err) => {
    if (err) {
      console.error("Error inserting data:", err.message);
    } else {
      console.log(`Inserted row of data: ${food}, ${mood}`);
    }
  });
}

function getRandomQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to insert arbitrary number of data entries random number of times
function insertRandomData(entries) {
  for (const entry of entries) {
    const { food, mood, minQuantity, maxQuantity } = entry;
    const quantity = getRandomQuantity(minQuantity, maxQuantity);
    for (let i = 0; i < quantity; i++) {
      insertData(1, food, mood);
    }
  }
}

// Data to insert
const dataToInsert = [
  { food: "Pizza", mood: "Bloated", minQuantity: 10, maxQuantity: 50 },
  { food: "Pizza", mood: "Tired", minQuantity: 10, maxQuantity: 50 },
  { food: "Pizza", mood: "Pain", minQuantity: 10, maxQuantity: 50 },

  { food: "Salad", mood: "Energized", minQuantity: 5, maxQuantity: 100 },
  { food: "Salad", mood: "Normal", minQuantity: 5, maxQuantity: 100 },
  { food: "Salad", mood: "Amazing", minQuantity: 5, maxQuantity: 100 },
  { food: "Salad", mood: "Bloated", minQuantity: 5, maxQuantity: 30 },

  { food: "Salmon", mood: "Amazing", minQuantity: 30, maxQuantity: 100 },
  { food: "Salmon", mood: "Energized", minQuantity: 30, maxQuantity: 50 },
  { food: "Salmon", mood: "Average", minQuantity: 5, maxQuantity: 15 },

  { food: "Burger", mood: "Energized", minQuantity: 5, maxQuantity: 100 },
  { food: "Burger", mood: "Normal", minQuantity: 5, maxQuantity: 100 },
  { food: "Burger", mood: "Amazing", minQuantity: 5, maxQuantity: 100 },
  { food: "Burger", mood: "Bloated", minQuantity: 5, maxQuantity: 30 },
];

insertRandomData(dataToInsert);
