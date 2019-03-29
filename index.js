const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile').development;

const db = knex(knexConfig);
const server = express();
server.use(express.json());

server.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: 'Please provide a name and description for the project.' });
  } else {
    db('projects').insert({ name, description })
        .then(arrayOfIds => {
          return db('projects').where({ id: arrayOfIds[0] })
        })
        .then(arrayOfProjects => {
          res.status(201).json({ ...arrayOfProjects[0], completed: Boolean(arrayOfProjects[0].completed) });
        })
        .catch(error => {
          res.status(500).json({ errorMessage: 'The project record could not be created. '});
        });
  }
});

server.get('/api/projects', async (req, res) => {
  try {
    const result = await db('projects')
        .then((projects) => {
          const projectsWithCompletedBooleans = projects.map(project => ({ ...project, completed: Boolean(project.completed)}));
          res.status(200).json(projectsWithCompletedBooleans);
        });
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ errorMessage: 'The projects could not be retrieved.' });
  }
});

server.post('/api/actions', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const action = req.body;
  if (!description || !notes || !project_id) {
    res.status(400).json({ errorMessage: 'Please provide a name and project_id for the action.' });
  } else {
    db('actions').insert({ description, notes, project_id, completed })
        .then(arrayOfIds => {
          return db('actions').where({ id: arrayOfIds[0] })
        })
        .then(arrayOfActions => {
          res.status(201).json({ ...arrayOfActions[0], completed: Boolean(arrayOfActions[0].completed) });
        })
        .catch(error => {
          res.status(500).json({ errorMessage: 'The action record could not be created. '});
        });
  }
});

server.get('/api/actions', async (req, res) => {
  try {
    const result = await db('actions')
        .then((actions) => {
          const actionsWithCompletedBooleans = actions.map(action => ({ ...action, completed: Boolean(action.completed)}));
          res.status(200).json(actionsWithCompletedBooleans);
        });
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ errorMessage: 'The actions could not be retrieved.' });
  }
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db('projects')
      .where({ id: id })
      .first()
      .then((project) => {
        if (!project) {
          res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        } else {
          db('actions')
              .where({ project_id: id })
              .select('id', 'description', 'notes', 'completed')
              .then(actions => {
                const actionsWithCompletedBooleans = actions.map(action => ({ ...action, completed: Boolean(action.completed)}));
                const projectWithActions = { ...project, completed: Boolean(project.completed), actions: actionsWithCompletedBooleans };
                res.status(200).json(projectWithActions);
              });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
      });
});


const port = 5000;
server.listen(port, () => console.log(`Listening on http://localhost: ${port}!`));

