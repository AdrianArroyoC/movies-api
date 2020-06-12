const boom = require('@hapi/boom');

// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();
  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
