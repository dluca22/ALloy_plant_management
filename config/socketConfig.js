// app.js exports the server instance that has been created
const server = require('../app');
// import cors configuration from the external file
const { corsOptions } = require('./corsConfiguration');


// from https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs
// creates a socket using the module and passing the server instance + the cors configurations




module.exports = (server) => {
    const socket = require('socket.io')(server, {
        cors: corsOptions,
      });

    return socket;
};

//   const socketConnection = require('./utils/socketConnection')
// const io = socketConnection(socket)
