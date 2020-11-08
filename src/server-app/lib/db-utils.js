const mysql = require('mysql');

/**
 * Create and return the DB connection
 */
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
  
module.exports = con;  