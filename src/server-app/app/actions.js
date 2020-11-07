const con = require('../lib/db-utils');

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
      executeQuery(`SELECT u.username, u.user_type_id, ut.user_type FROM user u, user_type ut  
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
};