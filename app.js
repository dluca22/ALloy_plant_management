const express = require('express');
const app = express();

// include json middleware
app.use(express.json());

// imports pool from database.js as 'db'
const db = require('./database');

app.get('/', (req, res) => {
  const html = `
    <h1>Entrypoint</h1>
    <ul>
        <li><a href="/machines">list of machines</a></li>
        <li><a href="/downtime">downtime page</a></li>
        <li><a href="/maintenance">maintenance page</a></li>
    </ul>
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
    } else if (result.length === 0) {
      return res.json({
        code: 204,
        message: 'There are no entries for this endpoint',
      });
    } else {
      res.json(result);
    }
  });
});

// endpoint for a specific machine, where data from the tables `machines` and its `operational_parameters` are joined and returned to the frontend
app.get('/machines/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT m.*, p.* FROM machines m JOIN operational_parameters p ON p.machine_id = m.id WHERE m.id = ${id}`,
    (error, result) => {
      if (error) {
        res.json({
          code: 400,
          message: 'bad request, unable to query the database',
        });
      }else if (result.length === 0) {
        return res.json({
          code: 204,
          message: 'There are no entries for this endpoint',
        });
      } else {
        res.json(result);
      }
    }
  );
});

app.get('/downtime', (req, res) => {
  db.query('SELECT * from downtime', (error, result) => {
    if (error) {
      return res.json({
        code: 400,
        message: 'bad request, unable to query the database',
      });
    } else if (result.length === 0) {
      return res.json({
        code: 204,
        message: 'There are no entries for this endpoint',
      });
    } else {
      res.json(result);
    }
  });
});

app.get('/maintenance', (req, res) => {
  db.query('SELECT * from maintenance', (error, result) => {
    if (error) {
      return res.json({
        code: 400,
        message: 'bad request, unable to query the database',
      });
    } else if (result.length === 0) {
      return res.json({
        code: 204,
        message: 'There are no entries for this endpoint',
      });
    } else {
      return res.json(result);
    }
  });
});

app.all('*', (req, res) => {
  const html = `
    <h1>404 - Invalid path</h1>
    <a href="/"><button>go home</button></a>
    `;
  res.send(html);
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
