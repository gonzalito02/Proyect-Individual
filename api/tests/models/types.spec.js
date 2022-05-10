const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('types', () => {
      it('should throw an error if name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Type.create({ name: 'misterious' });
      });
      it('should not repeat types', (done) => {
        Type.create({name: 'misterious'})
          .then(() => done(Type.create({name: 'misteriuos'})))
          .then(() => done(new Error('That name already exist')))
          .catch(() => done());
      });
    });
  });
});
