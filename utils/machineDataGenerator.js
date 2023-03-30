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



// temp randomNum function
function randomNum(){
    return Math.round(Math.random() * 100)
  }


  module.exports = randomNum;