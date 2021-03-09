const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'mysql',
  database: 'db_name',
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
