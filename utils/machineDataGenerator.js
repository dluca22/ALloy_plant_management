// this file retrieves operational_parameters for machines from the database
// gets min/max values for pressure, temperature and flow
// generates random values in between those parameters

// LATER will also generate randomly values outside those parameters to trigger an alert and log to database malfunctioning timestamps like it were to be an operational controller for the machine/robot

// pseudocode
// get all machines from the database
// for each get its operational_parameters on init, if not present
// might load them from another module since this function gets called on an interval then distroyed
// function has input of min & max values for operational parameters and generates random number in between those constraints
// socket.emit sends list of object for each machine with liveData based on random data generated

// gettin machines from database

// import database
const db = require('../database');

// async gets operational_params from database and returns a promise
// promise will return array of objects with the values that are needed for the random data generator functions
function getMachineData() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT m.id, m.name, m.online, p.min_temp, p.max_temp, p.flow_rate, p.min_pressure, p.max_pressure  FROM machines m JOIN operational_parameters p ON p.machine_id = m.id',
      (error, result) => {
        if (error) {
          console.log('errore in query machinesDataGenerator');
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// structure to generate random data for each machine returned from the database
async function machineDataGenerator(socket) {
  // initialize empty list of machine
  let machinesData;

  // if list is empty, quert database for all machines and set them to the var
  if (!machinesData) {
    machinesData = await getMachineData();
    console.log('ricerca db');
  }

  // else, if machines[] is already loaded to "state" go on with logic

  // for each machine received from database, on a 3 sec interval, emit a socket message named after the machine with updated data from
  const interval = setInterval(() => {
    machinesData.forEach((machine) => {

      // only emit data from machines that are flagged as "online"
      if (machine.online) {
        socket.emit(machine.name, {
          pressure: generateRandomData( machine.min_pressure, machine.max_pressure),
          temperature: generateRandomData(machine.min_temp, machine.max_temp),
          flow_rate: generateRandomFlowRate(machine.flow_rate),
        });
      }
    });

  }, 3000);

  // clear interval when user disconnects from socket
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('a user disconnected');
  });

  console.log('utente connesso al socket, chiamato machineDataGenerator');
}


// generate random number between an interval of max & min inclusive with 1 decimal
// TODO aggiungere casualità di numeri al di fuori del bracket minimo-massimo, esempio 2% di casistica che siano valori maggiori o minori del minimo o massimo (tipo moltiplicatore differenziale)
function generateRandomData(min, max) {
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(1));
}

// Generates a random number within a range of +/- 3 from the input value with 3 decimal
// TODO change fixed number to fixed percent from base number (means nothing adding +/-3 if one machine's value is 500 and another is 1 )
function generateRandomFlowRate(val) {
  const delta = Math.random() * (3 - -3) + -3;
  const result = val + delta;
  return Number(result.toFixed(3));
}

// exports the function that handles socket.emit that is called upon socket.connect
module.exports = machineDataGenerator;