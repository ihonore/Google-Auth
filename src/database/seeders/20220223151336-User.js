module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        email: 'janedoe@example.com',
        googleId:"sdnfkwYWNJWBcdnekno30pi03j4r3jc",
        information:"Jane Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'johndoe@example.com',
        googleId:"sdnfkwYWNJWBcdnekdeno30pi03j4r3jc",
        information:"John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
