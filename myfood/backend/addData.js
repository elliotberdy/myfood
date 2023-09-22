const sqlite3 = require('sqlite3').verbose();

// Open the database 
const db = new sqlite3.Database('mydatabase.db');

// Function to insert data for a specific food and mood
function insertData(food, mood) {
  const stmt = db.prepare('INSERT INTO mytable (food, mood) VALUES (?, ?)');
  stmt.run(food, mood);
  stmt.finalize();
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
        insertData(food, mood);
    }
  }
}

// Data to insert
const dataToInsert = [
  { food: 'Pizza', mood: 'Bloated', minQuantity: 10, maxQuantity: 50 },
  { food: 'Pizza', mood: 'Tired', minQuantity: 10, maxQuantity: 50 },
  { food: 'Pizza', mood: 'Pain', minQuantity: 10, maxQuantity: 50 },

  { food: 'Salad', mood: 'Energized', minQuantity: 5, maxQuantity: 100 },
  { food: 'Salad', mood: 'Normal', minQuantity: 5, maxQuantity: 100 },
  { food: 'Salad', mood: 'Amazing', minQuantity: 5, maxQuantity: 100 },
  { food: 'Salad', mood: 'Bloated', minQuantity: 5, maxQuantity: 30 },

  { food: 'Salmon', mood: 'Amazing', minQuantity: 30, maxQuantity: 100 },
  { food: 'Salmon', mood: 'Energized', minQuantity: 30, maxQuantity: 50 },
  { food: 'Salmon', mood: 'Average', minQuantity: 5, maxQuantity: 15 },

  { food: 'Burger', mood: 'Energized', minQuantity: 5, maxQuantity: 100 },
  { food: 'Burger', mood: 'Normal', minQuantity: 5, maxQuantity: 100 },
  { food: 'Burger', mood: 'Amazing', minQuantity: 5, maxQuantity: 100 },
  { food: 'Burger', mood: 'Bloated', minQuantity: 5, maxQuantity: 30 },
  
];

insertRandomData(dataToInsert);

db.close();
