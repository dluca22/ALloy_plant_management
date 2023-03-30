const randomNum = require('./machineDataGenerator')

const socket = require('../config/socketConfig')

const io = socket



// define the connect event listener outside of any middleware
io.on('connection', (socket) => {
  console.log('a user connected');

//   const interval = setInterval(() => {
//         // emit randonm number for temperature with machine identifier
//         socket.emit('temperatureUpdate',
//           {'forno': randomNum(),
//           'pressa': randomNum(),
//           'estrusore': randomNum()}
//         );
//       }, 3000);

  // example of receiving data from the client
  socket.on('message', (data) => {
    console.log(`received message from client: ${data}`);
  });

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to `);
  });
  // disconnect event listener
  socket.on('disconnect', () => {
    // console.log("2", interval) //test to see if interval matches
    clearInterval(interval);
    console.log('a user disconnected');
  });
});

