const express = require('express');
const app = express();

// include json middleware
app.use(express.json());

// imports pool from database.js as 'db'
const db = require('./database');

app.get('/', (req, res) => {
  const html = `
    <h1>Entrypoint</h1>
    <a href="/machines">list of machines</a>
    <a href="/downtime">downtime page</a>
    <a href="/maintenance">maintenance page</a>
    `;
  res.send(html);
});

// endpoint to get all machines in the database
app.get('/machines', (req, res) => {
  db.query('SELECT * from machines', (error, result) => {
    if (error) {
      res.json({
        code: 400,
        message: 'bad request, unable to query the database',
      });
    }
    res.json(result);
  });
});

// endpoint for a specific machine, where data from the tables `machines` and its `operational_parameters` are joined and returned to the frontend
app.get('/machines/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT m.*, p.*  from machines m JOIN operational_parameters p ON p.machine_id = m.id WHERE m.id = ${id}`,
    (error, result) => {
      if (error) {
        res.json({
          code: 400,
          message: 'bad request, unable to query the database',
        });
      }
      res.json(result);
    }
  );
});

app.get('/downtime', (req, res) => {
  res.send('GET request to the downtime pages');
});

app.get('/maintenance', (req, res) => {
  res.send('GET request to the maintenance pages');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
