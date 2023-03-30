// this is the external file to send data via webSockets, calling the machineDataGenerator and sending the data to the frontend on an interval schedule

// from https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs

/*

function socketConnection(socket) {

    const io = socket
  // define the connect event listener outside of any middleware
  io.on('connection', (socket) => {
    console.log('a user connected');

    // example of sending data to the client on 1 sec interval
    // const interval = setInterval(() => {
    //   // emit randonm number for temperature with machine identifier
    //   socket.emit('temperatureUpdate',
    //     {'forno': randomNum(),
    //     'pressa': randomNum(),
    //     'estrusore': randomNum()}
    //   );
    // }, 3000);
    // const interval = setInterval(() => {
    //   // emit randonm number for temperature with machine identifier
    //   socket.emit('temperatureUpdate', [
    //     { name: 'forno', temperature: randomNum() },
    //     { name: 'pressa', temperature: randomNum() },
    //     { name: 'estrusore', temperature: randomNum() },
    //   ]);
    // }, 3000);

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



}


module.exports = socketConnection;

*/