const connection = require('../config/connection')

const TABLE = 'candidates_answers';

const candidates_answers = {
  getUnscoredAnswers: (data) => {
    return new Promise( (resolve, reject) => {
      const query = connection.query(`SELECT ca.id id, candidate_id, question_id, 
        ca.answer user_answer, question, max_points, correct_answer 
        FROM ${TABLE} ca 
        LEFT JOIN questions q ON q.id=ca.question_id
        WHERE ca.candidate_id=?`, data.candidate_id, (err, res) => {
          console.log(query.sql, data)
          if (err) return reject(err)
          resolve( res )
        })
    })

  }
}

module.exports = candidates_answers;