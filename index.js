const express = require('express');
const lowdDB = require('lowdb');
const FyleSync = require('lowdb/adapters/FileSync');

// Server Setup
const PORT = 4000;

// Database Setup
const adapter = new FyleSync('db.json');
const db = lowdDB(adapter);
db.defaults({ users: [] }).write();

// Express Setup
const app = express();

// Users
// fetch users
app.get('/api/users', (req, res) => {
  const users = db.get('users').value(); // query
  res.status(200).json({ success: true, data: users });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

