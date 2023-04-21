require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use('/api', router);

app.listen(PORT);
