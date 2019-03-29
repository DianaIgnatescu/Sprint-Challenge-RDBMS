
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Create Portfolio',
          description: 'Build and deploy a portfolio website.',
          completed: false
        },
        {
          name: 'Build landing page for company X',
          description: 'Build a landing page and check with client if they are happy with the result.',
          completed: false
        },
        {
          name: 'Design database model for passion project',
          description: 'Use a database designer tool to create a visual representation of the database.',
          completed: false
        }
      ]);
    });
};
