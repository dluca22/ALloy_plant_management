// this file retrieves operational_parameters for machines from the database
// gets min/max values for pressure, temperature and flow
// generates random values in between those parameters

// LATER will also generate randomly values outside those parameters to trigger an alert and log to database malfunctioning timestamps like it were to be an operational controller for the machine/robot


// temp randomNum function
function randomNum(){
    return Math.round(Math.random() * 100)
  }


  module.exports = randomNum;