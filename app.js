const express = require('express');
// intialization of express server for configuration
const app = express();

//  creating the instance of the http server built into node passing configuration from app
// TODO - remove?? try and just use app instead of server
const server = require('http').createServer(app);

// import setup for web socket from separate file
// initialize socket instance passing server for the configuration
const socketSetup = require('./config/socketConfig');
const io = socketSetup(server);

// moved cors configuration to other file to share with socketConfig
const { corsConfig } = require('./config/corsConfiguration');



// middleware configurations
app.use(express.json()); // include json middleware for API responses
app.use(corsConfig);

// middleware for logging every incoming request
app.use((req, res, next) => {
  console.log(
    `Incoming ${req.method} | request to ${req.originalUrl} | status: ${res.statusCode}`
  );
  next();
});


// importing routes
const machineRoutes = require('./routes/machines');
const alertsRoutes = require('./routes/alerts');
const downtimeRoutes = require('./routes/downtime');
const maintenanceRoutes = require('./routes/maintenance');

// index entrypoint with raw html
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


// fallback invalid path
app.all('*', (req, res) => {
  const html = `
    <h1>404 - Invalid path</h1>
    <a href="/"><button>va a casa</button></a>
    `;
  res.send(html);
});


// ------- web sockets code ---------

// module that generates data and emits socket messages
const machineDataGenerator = require('./utils/machineDataGenerator')

// listens for socket connections
// LATER ? move to other file?? wasn't able to
// BUG - questo modo di chiamare la funzione machineDataGenerator() su ogni socket connection, fa in modo che una funzione diversa venga chiamata, quindi se piu client si connettono al backned, ogninuo ha uno steam diverso di dati generati casualmente
// si, è un test, ma sarebbe piu logico che lo stream di dati sia lo stesso tra tutti quanti e vengano solo comunicati quando qualcuno si connette, avendo lo stesso risultato per tutti
io.on('connection', (socket) => {
  console.log('a user connected');

// test
  socket.on('message', (data) => {
    console.log(`received message from client: ${data}`);
  });

  // handle errors
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err}`);
  });

  // upon connection, if no error, call function that emits random data for each machine in database
  machineDataGenerator(socket);

});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

module.exports = io;