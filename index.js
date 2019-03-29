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

const port = 5000;
server.listen(port, () => console.log(`Listening on http://localhost: ${port}!`));

