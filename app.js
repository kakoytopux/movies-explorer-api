const express = require('express');
const mongoose = require('mongoose');
const { createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.post('/signup', createUser);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.listen(PORT);
