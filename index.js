const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const { config } = require('./config/index');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/json', (req, res) => {
  res.json({ hello: 'world' });
});

// Reto con Query Params
app.get('/query', (req, res) => {
  const leap = req.query.year % 4 ? "isn't" : 'is';
  res.send(`${req.query.year} ${leap} leap-year.`);
});

// Reto con URL Params
app.get('/params/:year', (req, res) => {
  const leap = req.params.year % 4 ? "isn't" : 'is';
  res.send(`${req.params.year} ${leap} leap-year.`);
});

// Reto con el Body
app.post('/body', (req, res) => {
  const leap = req.body.year % 4 ? "isn't" : 'is';
  res.send(`${req.body.year} ${leap} leap-year.`);
});

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
