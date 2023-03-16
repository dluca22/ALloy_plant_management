

const express = require('express')
const app = express()

// imports pool from database.js as 'db'
const db = require('./database')

// == db can now perform queries from database.js imported connection ===
// db.query('SELECT * FROM machines', (err, res, fields) => {
//       if (err) throw err;
//       console.log(res);
//     });

app.get('/', (req, res) => {
    res.send("funziona")
})


app.get('/machines', (req, res) => {
  res.send('GET request to the machine page')
})
app.get('/machines/:id', (req, res) => {
    const {id} = req.params
  res.send(`GET request to the machine ${id} page`)
})


app.get('/downtime', (req, res) => {
  res.send('GET request to the downtime pages')
})

app.get('/maintenance', (req, res) => {
  res.send('GET request to the maintenance pages')
})




app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})