const express = require('express');

const router = express.Router()

// // imports pool from database.js as 'db'
const db = require('../database')
// endpoint to get all machines in the database
router.get('/', (req, res) => {
  db.query('SELECT * from machines', (error, result) => {
    if (error) {
      res.json({
        code: 400,
        message: 'bad request, unable to query the database',
      });
    } else if (result.length === 0) {
      return res.json({
        code: 204,
        message: 'There are no entries for this endpoint',
      });
    } else {
      res.json(result);
    }
  });
});


// ==================== esempio in stile MVC a cui migrare =================================
// router.route('/:id')
//   .get((req,res) => {
//     // ........
//   })
//   .post((req, res) => {
  //     // ........
  //   })
  //   .put((req, res) => {
    //     // ........
    //   })
    // ===================================================================================




    // endpoint for a specific machine, where data from the tables `machines` and its `operational_parameters` are joined and returned to the frontend
    router.get('/:id', (req, res) => {
      const { id } = req.params;
      db.query(
        `SELECT m.*, p.* FROM machines m JOIN operational_parameters p ON p.machine_id = m.id WHERE m.id = ${id}`,
        (error, result) => {
          if (error) {
            res.json({
              code: 400,
              message: 'Errore nella comunicazione al databse',
            });
          }else if (result.length === 0) {
            return res.json({
              code: 204,
              message: 'Non ci sono risultati nel database',
            });
          } else {
            res.json(result[0]);
          }
        }
        );
      });

      // patch request, get id and body to update the machine.online column
      const io = require('../app') // test

  router.patch('/:id', (req, res) =>{
    const { id } = req.params
    const body = req.body // {online: true/false}


    try{
      db.query(`UPDATE machines m SET m.online = ${body.online} WHERE m.id = ${id}`)
    }
    catch{ // serve ??
      console.log("errore try/catch");
      return res.json({code:500, message: "Errore nell'update database [backend]"})
    }
    return res.json({code:200, message: "Richiesta eseguita."})
  })



  module.exports = router;