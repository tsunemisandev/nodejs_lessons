const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('db connected with success');
});

app.get('/', (req, res) => {
  connection.query('SELECT "hello"', (error, results) => {
    console.log(results);
    return res.send(results);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
