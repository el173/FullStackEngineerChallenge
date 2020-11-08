const con = require('../lib/db-utils');

/**
 * This function will execute the query as a promise
 * @param {*} query 
 * @param {*} callback 
 * @param {*} fallback 
 */
function executeQuery (query, callback, fallback) {
  const executer = (command, resolve, reject) => {
    con.query(query, function (err, result, fields) {
      if (err) {
        reject(err);
        throw err;
      }
      resolve(result);
    });
  };

  // Check the DB connectivity and create new connection if not exists
  if(con.state === 'disconnected'){
    con.connect(function(err) {
      if (err) {
        fallback(err);
        throw err;
      }
      executer(query, callback, fallback);
    });
  } else {
    executer(query, callback, fallback);
  }
};

module.exports = {
  checkLogin: (userName, password) => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT u.username, u.user_type_id, ut.user_type, u.id FROM user u, user_type ut  
        WHERE 
          u.username='${userName}' 
        AND 
          u.password='${password}' 
        AND 
          u.status=1 
        AND ut.id=u.user_type_id`, 
        resolve, reject
      );
    })
  ),
  getAllEmployees: () => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT 
      u.username, u.id, u.password, u.status, ut.user_type 
      FROM user u, user_type ut 
      WHERE u.user_type_id=ut.id`, resolve, reject);
    })
  ),
  getEmpOnly: () => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT 
      u.username, u.id, u.password, u.status, ut.user_type 
      FROM user u, user_type ut 
      WHERE u.user_type_id=ut.id AND ut.user_type='employee' AND u.status=1 `, resolve, reject);
    })
  ),
  addUser: (username, password, userType) => (
    new Promise( (resolve, reject) => {
      executeQuery(`INSERT INTO user
      (username, password, status, user_type_id)
      VALUES('${username}', '${password}', 1, ${userType})`, resolve, reject);
    })
  ),
  updateUser: (userId, username, password, userType) => (
    new Promise( (resolve, reject) => {
      executeQuery(`UPDATE user
      SET username='${username}', password='${password}', user_type_id=${userType}
      WHERE id=${userId}`, resolve, reject);
    })
  ),
  changeUserStatus: (userId) => (
    new Promise( (resolve, reject) => {
      executeQuery(`UPDATE user
      SET status='2'
      WHERE id=${userId}`, resolve, reject);
    })
  ),
  addReviewer: (reviewer, receiver) => (
    new Promise( (resolve, reject) => {
      executeQuery(`INSERT INTO user_has_reviews 
      (giver_id, receiver_id) VALUES(${reviewer}, ${receiver}) `, resolve, reject);
    })
  ),
  listEmpReviews: () => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT uhr.id, uhr.date, uhr.feedback, 
      (SELECT username FROM user WHERE id = uhr.giver_id) AS giver,
      (SELECT username FROM user WHERE id = uhr.receiver_id) AS receiver,
      (SELECT username FROM user WHERE id = uhr.modified_user_id) AS modifier
      FROM user_has_reviews uhr`, resolve, reject);
    })
  ),
  updateFeedback: (feedback, feedbackId, byAdmin, adminId) => (
    new Promise( (resolve, reject) => {
      executeQuery(`UPDATE user_has_reviews 
      SET feedback='${feedback}', date=NOW()` 
      + ( byAdmin ? `, modified_user_id=${adminId}`: ``)
      + ` WHERE id=${feedbackId}`, 
      resolve, reject);
    })
  ),
  getMyReview: (reviewer, id) => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT uhr.id, uhr.date, uhr.feedback, 
      (SELECT username FROM user WHERE id = uhr.giver_id) AS giver,
      (SELECT username FROM user WHERE id = uhr.receiver_id) AS receiver,
      (SELECT username FROM user WHERE id = uhr.modified_user_id) AS modifier
      FROM user_has_reviews uhr WHERE ${reviewer ? `uhr.giver_id=${id}`: `uhr.receiver_id=${id}`}`, resolve, reject);
    })
  ),
};