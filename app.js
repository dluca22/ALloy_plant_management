const express = require('express');
const app = express();
const { corsConfig } = require('./config/corsConfiguration');

const server = require('http').createServer(app);
const testEmitter = require('./utils/testEmitter');
const socketSetup = require('./config/socketConfig');
const io = socketSetup(server);

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

const randomNum = require('./utils/machineDataGenerator')



// socket connection but socket config is in another file
io.on('connection', (socket) => {
  console.log('a user connected');

  const interval = setInterval(() => {
    testEmitter(socket);
  },3000);

  socket.on('message', (data) => {
    console.log(`received message from client: ${data}`);
  });

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to `);
  });
  // disconnect event listener
  socket.on('disconnect', () => {
    clearInterval(interval)
    console.log('a user disconnected');
  });
});

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

module.exports = server;
