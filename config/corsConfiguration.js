const cors = require('cors');
const corsOptions = {
    origin: 'http://127.0.0.1:4200',
  };

const corsConfig = cors(corsOptions);


module.exports = { corsConfig, corsOptions}