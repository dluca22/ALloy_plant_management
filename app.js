

const express = require('express')
const app = express()

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




app.listen(3333, () => {
    console.log("listening on http://localhost:3333")
})