// import cors configuration from the external file
const { corsOptions } = require('./corsConfiguration');

// export this function that accepts server instance and returns configured socket...hopefully
function socketSetup(server) {
  const socket = require('socket.io')(server, {
    cors: corsOptions,
  });

  return socket;
};

module.exports = socketSetup;
