const connection = require('../config/connection')

const TABLE = 'candidates';

const candidates = {
  all: function(data) {
    return new Promise( function(resolve, reject) {
      const query = connection.query(`SELECT id, candidate_name, picture_url, time_posted, review_status FROM ${TABLE} WHERE review_status=?`, data.review_status, (err,res) => {
        if (err)
          return reject(err)
        console.log(data, query.sql, res)
        resolve( res )
      })
    })
  },
  // The variables cols and vals are arrays.
  create: function(data) {
    // orm.create(table, cols, vals, function(res) {
    return new Promise( function(resolve, reject) {
      const query = connection.query(`INSERT INTO ${TABLE} SET ?`, [data], (err, res) => {
        if (err) 
          return reject(err)

        connection.query(`SELECT * FROM ${TABLE} WHERE id=?`, [res.insertId], (err, res) => {
          if (err)
            return reject(err)
          resolve( res[0] )          
        })
      })  
    })
    // });
  },
  update: function(objColVals, condition, cb) {
    // orm.update(table, objColVals, condition, function(res) {
      cb(res);
    // });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = candidates;