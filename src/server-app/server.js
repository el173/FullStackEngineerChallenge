require('dotenv').config();

const app = require('./app/route');

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("server-app listening at http://%s:%s", host, port);
})