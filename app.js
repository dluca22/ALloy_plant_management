const express = require('express');
const app = express();

const machineRoutes = require('./routes/machines')
const alertsRoutes = require('./routes/alerts')
const downtimeRoutes = require('./routes/downtime')
const maintenanceRoutes = require('./routes/maintenance')

// include json middleware
app.use(express.json());

app.get('/', (req, res) => {
  const html = `
    <h1>Entrypoint</h1>
    <ul>
        <li><a href="/machines">list of machines</a></li>
        <li><a href="/downtime">downtime page</a></li>
        <li><a href="/maintenance">maintenance page</a></li>
        <li><a href="/alerts">alerts page</a></li>
    </ul>
    `;
  res.send(html);
});

// moved each route to its own file
app.use('/machines', machineRoutes)
app.use('/downtime', downtimeRoutes)
app.use('/maintenance', maintenanceRoutes)
app.use('/alerts', alertsRoutes)


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
