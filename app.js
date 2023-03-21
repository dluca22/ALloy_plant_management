const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

const app = express();
// include json middleware
app.use(express.json());
app.use(cors())

// morgan is an external middleware module to log requests status and repsonses to console, it takes various configurations
// app.use(morgan(':method :url :status'));

// this is a custom middleware we can define to log to console the values we want
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} | request to ${req.originalUrl} | status: ${res.statusCode}`);
  next();
});


const corsOptions = {
  origin: "http://127.0.0.1:4200"
}

const machineRoutes = require('./routes/machines')
const alertsRoutes = require('./routes/alerts')
const downtimeRoutes = require('./routes/downtime')
const maintenanceRoutes = require('./routes/maintenance')


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

// backend:
    // "/" index
    // "/machines" & machines:id gestiscono la lista macchine completa + specifica macchina
    //  "/downtime" è l'endopoint che manda indietro tutti i downtime registrati, + aggiungere /downtime:id, per la ricerca specifica dei downtime, oppure machines/:id/downtime
    // "/maintenance" è lo stesso di downtime
    // "/alerts" è lo stesso

// moved each endpoint to its own file
app.use('/machines', cors(corsOptions), machineRoutes)
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
