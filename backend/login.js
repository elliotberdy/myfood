// login.js

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// to parse JSON requests
app.use(bodyParser.json());

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER_USER,
  host: process.env.DB_USER_HOST,
  database: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  port: process.env.DB_USER_PORT,
});

function checkUserExists(username, password, callback) {
  pool.query(
    `
      CREATE TABLE IF NOT EXISTS users (
        userid SERIAL PRIMARY KEY,
        username TEXT,
        password TEXT
      )
      `,
    (error, results) => {
      if (error) {
        console.error("Error creating table:", error);
        callback(error, null);
      } else {
        console.log("Table users created successfully");

        // Now, retrieve all hashed passwords associated with the provided username
        pool.query(
          "SELECT userid, password FROM users WHERE username = $1",
          [username],
          (error, results) => {
            if (error) {
              console.error("Error querying user:", error);
              callback(error, null);
            } else {
              let userID = null;

              // Loop through the retrieved hashed passwords
              for (const row of results.rows) {
                const hashedPassword = row.password;

                // Use bcrypt.compareSync to compare the provided password with the hashed password
                if (bcrypt.compareSync(password, hashedPassword)) {
                  // If a match is found, set userID and break out of the loop
                  userID = row.userid;
                  break;
                }
              }

              callback(null, userID);
            }
          }
        );
      }
    }
  );
}

function createNewUser(username, password, callback) {
  // Query the database to get the highest existing userid
  pool.query("SELECT MAX(userid) FROM users", (error, result) => {
    if (error) {
      console.error("Error querying database:", error);
      callback(error, null);
    } else {
      // Increment the highest userid to determine the next available userid
      const highestUserId = result.rows[0].max;
      const nextUserId = highestUserId !== null ? highestUserId + 1 : 1;

      // Generate a salt (random data) to be used during hashing
      const saltRounds = 10; // The number of rounds determines the computational cost
      bcrypt.genSalt(saltRounds, (saltError, salt) => {
        if (saltError) {
          console.error("Error generating salt:", saltError);
          callback(saltError, null);
        } else {
          // Hash the password using the generated salt
          bcrypt.hash(password, salt, (hashError, hashedPassword) => {
            if (hashError) {
              console.error("Error hashing password:", hashError);
              callback(hashError, null);
            } else {
              // Store the hashed password in database
              console.log("Hashed Password:", hashedPassword);
              pool.query(
                "INSERT INTO users (userid, username, password) VALUES ($1, $2, $3) RETURNING userid",
                [nextUserId, username, hashedPassword],
                (insertError, insertResult) => {
                  if (insertError) {
                    console.error("Error inserting new user:", insertError);
                    callback(insertError, null);
                  } else {
                    const newUserid = insertResult.rows[0].userid;
                    console.log(`New user created with userid: ${newUserid}`);
                    callback(null, newUserid);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
}

module.exports = {
  checkUserExists,
  createNewUser,
};
