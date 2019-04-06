const connection = require('../config/connection')

const something = {
  all: function(cb) {
    // orm.all(table, function(res) {
      cb(res);
    // });
  },
  // The variables cols and vals are arrays.
  create: function(data, cb) {
    // orm.create(table, cols, vals, function(res) {
    return new Promise( function(resolve, reject) {
      const query = connection.query("INSERT INTO something SET ?", [data], (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve( query.sql )
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
module.exports = something;