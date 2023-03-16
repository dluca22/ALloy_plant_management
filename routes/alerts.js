const express = require('express');

const router = express.Router()

// // imports pool from database.js as 'db'
const db = require('../database')

// endpoint to get all machines in the database
router.get('/', (req, res) => {
    db.query('SELECT * from alerts', (error, result) => {
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

  module.exports = router;