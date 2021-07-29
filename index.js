const express = require('express');
const lowdDB = require('lowdb');
const FyleSync = require('lowdb/adapters/FileSync');
const joi = require('joi');
const { nanoid } = require('nanoid');

// Server Setup
const PORT = 4000;

// Database Setup
const adapter = new FyleSync('db.json');
const db = lowdDB(adapter);
db.defaults({ users: [] }).write();

// Express Setup
const app = express();

// Global Middlewares
app.use(express.json());

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

// create new user
app.post('/api/users', (req, res) => {
  const body = req.body;
  // data validation
  const userSchema = joi.object({
    name: joi.string().min(3).max(24).required(),
    lastname: joi.string().min(3).max(24).required(),
    email: joi.string().email().required(),
    username: joi.string().min(3).max(20).alphanum().required(),
    phone: joi.string().length(10).pattern(/^[0-9]+$/)
  });
  const result = userSchema.validate(body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    res.status(400).json({ success: false, message: 'Validation error', data: value, error: error });
  } else {
    // query if there is already an user with same email or username
    const exists = db.get('users').find(user => user.email === body.email || user.username === body.username).value();
    if (!exists) {
      // data management for user creation
      const user = {
        _id: nanoid(),
        ...body, 
        createdAt: Date.now(),
      };
      // db management
      db.get('users').push(user).write(); // mutation
      res.status(201).json({ success: true, message: 'User has been created', data: user });
    } else {
      res.status(409).json({ success: false, message: 'Email or Username is already used' });
    }
  }  
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

