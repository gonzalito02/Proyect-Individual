const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { UUIDV4 } = require('sequelize/types');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe('creation', () => {
      beforeEach(() => Pokemon.sync({ force: false }));
      it('should throw an error if the propertys are incorrect', (done) => {
        Pokemon.create({
          name: "picachu",
          height: "string",
          weight: "string"
        })
        .then(() => done(new Error('Some propertys are wrong')))
        .catch(() => done());
      });
      it('should not create the Character if name is not send', async () => {
        try {
          await Pokemon.create({hp: 100});
        } catch (error) {
          expect(error.message);
        }
      });
      it('should create the Character if all required properties are ok', async () => {
        const poke = await Pokemon.create({
          name: 'test',
          hp: 100,
          height: 150,
          weight: 25
        })/* addType(await Type.findAll({
          where: {name : "normal"}
        })) */
        expect(poke.toJSON()).toEqual({
          id: new UUIDV4(),
          name: 'test',
          hp: 1000,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 1500,
          weight:250,
          img: "no image"
        });
      });
    })
  });
});
