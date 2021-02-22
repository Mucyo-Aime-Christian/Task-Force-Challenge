module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Todos', [{
    title: 'bathing',
    description: 'wash my body after sports',
    priority: 'Medium',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Todos', null, {})
};
