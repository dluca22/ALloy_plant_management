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
const db = require('../database')

// async gets operational_params from database and returns a promise
function getMachineData(){
return new Promise((resolve, reject) =>{

    db.query('SELECT m.id, m.name, p.min_temp, p.max_temp, p.flow_rate, p.min_pressure, p.max_pressure  FROM machines m JOIN operational_parameters p ON p.machine_id = m.id', (error, result) => {
        if (error) {
            console.log('errore in query machinesDataGenerator')
            reject(error)
        }
        else {
            resolve(result)
        }
    })
})

}

async function machineDataGenerator(socket) {

    let machinesData;

    if(!machinesData){
        machinesData = await getMachineData()
    }

    console.log("quiiii", machinesData[0])

    machinesData.forEach(machine => {


// TODO continuare qua a creare un emit per ogni macchina, ma controllare se ha senso

        socket.emit(machinesData.name, {
            id: machine.id,
            name: machine.name,
            min_pressure :
            max_pressure :
            min_temperature :
            min_temperature :
            min_pressure :
        })
    })


  console.log('chiamata');
  // upon connection call function that generates random values after getting machine parameters
  const interval = setInterval(() => {
    socket.emit('temperatureUpdate', [
      { name: 'forno', temperature: randomNum() },
      { name: 'pressa', temperature: randomNum() },
      { name: 'estrusore', temperature: randomNum() },
    ]);
  }, 3000);
}

module.exports = machineDataGenerator;

// temp randomNum function
function randomNum() {
  return Math.round(Math.random() * 100);
}
