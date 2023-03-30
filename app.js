const express = require('express');
const app = express();
const {corsConfig} = require('./config/corsConfiguration')


const server = require('http').createServer(app);
const socketConfig = require('./config/socketConfig')
const io = socketConfig(server)

io.on('connection', (socket) =>{
  console.log("connected user")


  socket.on('disconnect', () => {

    console.log('a user disconnected');
  });

})


// include json middleware
app.use(express.json());
app.use(corsConfig);


app.use((req, res, next) => {
  console.log(
    `Incoming ${req.method} | request to ${req.originalUrl} | status: ${res.statusCode}`
  );
  next();
});

const machineRoutes = require('./routes/machines');
const alertsRoutes = require('./routes/alerts');
const downtimeRoutes = require('./routes/downtime');
const maintenanceRoutes = require('./routes/maintenance');

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

// moved each endpoint to its own file
app.use('/machines', corsConfig, machineRoutes);
app.use('/downtime', downtimeRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/alerts', alertsRoutes);

app.all('*', (req, res) => {
  const html = `
    <h1>404 - Invalid path</h1>
    <a href="/"><button>va a casa</button></a>
    `;
  res.send(html);
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
