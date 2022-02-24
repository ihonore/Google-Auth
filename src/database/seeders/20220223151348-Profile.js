module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Profiles",
      [
        {
          userId: 1,
          age:43,
          gender:"Female",
          address:"KN 234 st, Kigali",
          education: "Bachelors",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          age:54,
          gender:"Male",
          address:"KN 714 st, Kigali",
          education: "Masters",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Profiles", null, {})
};