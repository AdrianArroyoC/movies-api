const assert = require('assert');
const buildMessage = require('../utils/buildMessage.js');

describe.only('utils - buildMessage', () => {
  describe('when receives and entity and an action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create');
      const expected = 'movie created';
      assert.strictEqual(result, expected);
    });
  });

  describe('when receives an entity and an action and this is a list', () => {
    it('should return the perspective message whit the entity in plural', () => {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });
  });
});
