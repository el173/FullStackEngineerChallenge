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
      executeQuery(`SELECT * FROM user WHERE username='${userName}' AND password='${password}'`, resolve, reject);
    })
  ),
  getAllEmployees: () => (
    new Promise( (resolve, reject) => {
      executeQuery(`SELECT * FROM user WHERE user_type_id=(SELECT id FROM user_type WHERE user_type='admin')`, resolve, reject);
    })
  ),
};