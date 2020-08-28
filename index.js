const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const debug = require('express-debug');

//app.enable('strict routing');

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/usersMovies.js');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// CORS
//app.use(cors());
app.options(config.cors, cors());

// Body parser
//app.use(express.json());
app.use(bodyParser.json());

// Http Logger
app.use(morgan(config.dev ? 'dev' : 'tiny'));

// Rutas
moviesApi(app);
userMoviesApi(app);

// Error 404
app.use(notFoundHandler);

// Middlewares de error
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Debugger (después de las rutas)
debug(app, {});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

// Rutas de ejemplos anteriores y para el reto
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
{
  /*app.get('/', (req, res) => {
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
});*/
}
