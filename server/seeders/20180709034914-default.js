'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('1');
    return queryInterface.bulkInsert('decks', [
      {
        name: 'Debug Deck',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {
      returning: true,
    }).then(decks => {
      console.log('2');
      return queryInterface.bulkInsert('users', [
        {
          username: 'admin',
          password: '',
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {
        returning: true,
      }).then(users => {
        return queryInterface.bulkInsert('scores', [
          {
            score: 100,
            userId: 0,
            deckId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            score: 99,
            userId: 0,
            deckId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            score: 98,
            userId: 0,
            deckId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
