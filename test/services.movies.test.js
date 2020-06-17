const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub
} = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MoviesService = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  const moviesService = new MoviesService();
  describe('when getMovies method is called', async () => {
    it('should call the getall MongoLib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });

  describe('when getMovie method is called', async () => {
    it('should call the get MongoLib method', async () => {
      await moviesService.getMovie({});
      assert.strictEqual(getStub.called, true);
    });

    it('should return an object of movie', async () => {
      const result = await moviesService.getMovie({});
      const expected = moviesMock[0];
      assert.deepEqual(result, expected);
    });
  });

  describe('when createMovie method is called', async () => {
    it('should call the create MongoLib method', async () => {
      await moviesService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });

    it('should return an id of the created movie', async () => {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      assert.strictEqual(result, expected);
    });
  });

  describe('when updateMovie method is called', async () => {
    it('should call the update MongoLib method', async () => {
      await moviesService.updateMovie({});
      assert.strictEqual(updateStub.called, true);
    });

    it('should return an id of the updated movie', async () => {
      const result = await moviesService.updateMovie({});
      const expected = moviesMock[0].id;
      assert.strictEqual(result, expected);
    });
  });

  describe('when deleteMovie method is called', async () => {
    it('should call the delete MongoLib method', async () => {
      await moviesService.deleteMovie({});
      assert.strictEqual(deleteStub.called, true);
    });

    it('should return an id of the deleted movie', async () => {
      const result = await moviesService.deleteMovie({});
      const expected = moviesMock[0].id;
      assert.strictEqual(result, expected);
    });
  });
});
