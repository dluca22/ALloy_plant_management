const express = require('express');
const app = express();

const cors = require('cors');
const http = require('http').createServer(app);

const corsOptions = {
  origin: 'http://127.0.0.1:4200',
};

// from https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs
const io = require('socket.io')(http, {
  cors: corsOptions
});

// include json middleware
app.use(express.json());
app.use(cors(corsOptions));


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
app.use('/machines', cors(), machineRoutes);
app.use('/downtime', downtimeRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/alerts', alertsRoutes);

// define the connect event listener outside of any middleware
io.on('connection', (socket) => {
  console.log('a user connected');

  // example of sending data to the client
  const interval = setInterval(() => {
    socket.emit('data', {
      randomNum: Math.round(Math.random() * 100)
    });
  }, 1000);

  // example of receiving data from the client
  socket.on('message', (data) => {
    console.log(`received message from client: ${data}`);
  });

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to `);
  });
  // disconnect event listener
  socket.on('disconnect', () => {
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

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
