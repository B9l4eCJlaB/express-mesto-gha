/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const statusCodes = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Error to db connection');
  });

app.use((req, res, next) => {
  req.user = {
    _id: '62dc2b341ed7a26eed4f90e9',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send({ message: 'Такой страницы не существует' });
});

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
