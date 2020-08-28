const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });

    it('should respond with the list of movies', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });
  });

  describe('GET /movies/:movieId', () => {
    const movieId = '5ee306da9083a63e7b376de8';
    it('should respond with status 200', (done) => {
      request
        .get('/api/movies/' + movieId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with the retrieved movie', (done) => {
      request
        .get('/api/movies/' + movieId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock.find((movie) => movie.id === movieId),
            message: 'movie retrieved'
          });
          done();
        });
    });
  });

  describe('POST /movies/', () => {
    it('should respond with status 201', (done) => {
      request
        .post('/api/movies/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });

    it('should respond with the id  of the created movie', (done) => {
      request
        .post('/api/movies/')
        .send({
          title: 'Test',
          year: 2020,
          cover: 'http://dummyimage.com/test',
          description: 'Post Test',
          duration: 1,
          contentRating: 'G',
          source: 'https://ovh.net/test',
          tags: []
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie created'
          });
          done();
        });
    });
  });

  describe('PUT /movies/:movieId', () => {
    const movieId = '5ee306da9083a63e7b376de8';
    it('should respond with status 200', (done) => {
      request
        .put('/api/movies/' + movieId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with the id of the updated movie', (done) => {
      request
        .put('/api/movies/' + movieId)
        .send({
          title: 'Test'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie updated'
          });
          done();
        });
    });
  });

  describe('DELETE /movies/:movieId', () => {
    const movieId = '5ee306da9083a63e7b376de8';
    it('should respond with status 200', (done) => {
      request
        .delete('/api/movies/' + movieId)
        /*.set('Accept', 'application/json')
        .expect('Content-Type', /json/)*/
        .expect(200, done);
    });

    it('should respond with the id of the deleted movie', (done) => {
      request
        .delete('/api/movies/' + movieId)
        /*.set('Accept', 'application/json')
        .expect('Content-Type', /json/)*/
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie deleted'
          });
          done();
        });
    });
  });
});
