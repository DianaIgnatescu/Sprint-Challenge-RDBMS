
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          description: 'Decide on projects to be added to portfolio',
          notes: 'Consider whether to include project X from week Y',
          completed: false,
          project_id: 1
        },
        {
          description: 'Submit style guide for approval',
          notes: 'Ask client what options they prefer.',
          completed: false,
          project_id: 2
        },
        {
          description: 'Decide on style guide for portfolio',
          notes: 'Decide between dark or light modes.',
          completed: false,
          project_id: 1
        },
        {
          description: 'Export database model from free online tool',
          notes: 'Finish putting the database together and export result.',
          completed: false,
          project_id: 3
        },
        {
          description: 'Create endpoints for API',
          notes: 'Focus on error handling',
          completed: false,
          project_id: 3
        },
        {
          description: 'Gather stock photos',
          notes: 'The photos need to include people in office environments',
          completed: false,
          project_id: 2
        }
      ]);
    });
};
