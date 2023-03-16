const mysql = require('mysql');

const pool = mysql.createPool({
  host: '192.168.1.125',
  user: 'AAAAA',
  password: 'dbPW894',
  database: 'azienda',
  connectTimeout: 10000 //The milliseconds before a timeout occurs during
});


module.exports = pool;

// === shortcut for the pool.getConnection() -> connection.query() -> connection.release() code flow ====
    // pool.query('SELECT * FROM machines', (err, res, fields) => {
    //   if (err) throw err;
    //   console.log(res);
    // });

//  ===== verbose version ========

// pool.getConnection((err, connection) => {
//     if (err) throw err;

//     connection.query('SELECT * FROM machines', (error, res, fields) => {
//         console.log(res)

//         // releases a connection back to the connection pool
//         connection.release()

//         if (error) throw error;
//         return
//     })
// })

// ============================ INITIAL TESTS ====================================

//  test connection to database and funciton output saved to a file with writeFileSync and formatted with stringify with indentation

// createConnection is used for low volume connnections or performing a query then closing
// const connection = mysql.createConnection({
//     host: '192.168.1.125',
//     user: 'AAAAA',
//     password: 'dbPW894',
//     database: 'azienda'
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
//   });

// const { writeFileSync } = require('fs')

// connection.query('SELECT * FROM machines', function (error, results, fields) {
//     if (error) throw error;
//     writeFileSync("./db-connection-results.txt", `results: ${JSON.stringify(results, null, 2)}`, {flag:'a'}, (error, result) => {
//         if(error){
//             console.log('errore in writefilesync 1', error)
//             return
//         }
//         console.log('done writing')
//     })
//     writeFileSync("./db-connection-results.txt", `fields: ${JSON.stringify(fields, null, 2)}`, {flag:'a'}, (error, result) => {
//         if(error){
//             console.log('errore in writefilesync 1', error)
//             return
//         }
//         console.log('done writing')
//     })
// })
