require('dotenv').config();

const mysql = require('mysql');
const fs = require('fs');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  multipleStatements: true,
});


fs.readFile('custom_scripts/db.sql', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log(data);
  con.query(data, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    con.end();
    process.exit();
  });
});
});

