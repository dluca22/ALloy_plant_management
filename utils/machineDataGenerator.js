// this file retrieves operational_parameters for machines from the database
// gets min/max values for pressure, temperature and flow
// generates random values in between those parameters

// LATER will also generate randomly values outside those parameters to trigger an alert and log to database malfunctioning timestamps like it were to be an operational controller for the machine/robot

// ISSUE:
// Behaves like expected, but relys on frontend to send back a message to force update the list of machines.online that can emit values.
// without the "patchStatus" message, fake data will still be generated on the previous list of machines queried from database before their statust change.

// import database
const db = require('../database');

// async gets list of machines + their operational_params from database IF machine is "online" returning a promise
// promise will return array of machine objects with the values that are needed for the random data generator functions
// it will get called again from the frontend to force update the list of machines that are online/offline
function getMachineData() {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT m.id, m.name, p.min_temp, p.max_temp, p.flow_rate, p.min_pressure, p.max_pressure
        FROM machines m JOIN operational_parameters p
        ON p.machine_id = m.id
        WHERE m.online = true`,
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

// function to emit data on socket connection based on machine parameters from database
async function machineDataGenerator(socket) {
  // when new connection, fetch data from DB, storing data to variable is useless
  let machinesData = await getMachineData();

  // for each machine received from database, on a 2 sec interval, emit a socket message named after the machine with updated data from
  const interval = setInterval(() => {
    machinesData.forEach((machine) => {
      socket.emit(machine.name, {
          pressure: generateRandomData(
            machine.min_pressure,
            machine.max_pressure),
          temperature: generateRandomData(machine.min_temp, machine.max_temp),
          flow_rate: generateRandomFlowRate(machine.flow_rate),
        });
    });
  }, 2000);


  // when successful patch request, frontend will send "patchStatus" message to trigger a refresh of machines.online that emit data
  // TODO non è il metodo ideale, ma non mi viene in mente come forzare questo comportamento dalla .patch() request.
  socket.on('patchStatus', async () => {
    machinesData = await getMachineData();
  });

  // clear interval when user disconnects from socket
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('a user disconnected');
  });

  console.log('utente connesso al socket');
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
