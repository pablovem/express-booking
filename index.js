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
// fetch all users
app.get('/api/users', (req, res) => {
  const users = db.get('users').value(); // query
  res.status(200).json({ success: true, data: users });
});

// get an user by id
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  const user = db.get('users').find({ _id: id }).value(); // query
  res.status(200).json({ success: true, data: user });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

