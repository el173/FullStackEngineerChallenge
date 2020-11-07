const express = require('express');
const app = express();

const {
  checkLogin,
  getAllEmployees,
} = require('./actions');

app.post('/checkLogin', function (req, res) {
  checkLogin('sam@mail.com', '1213456').then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send(result);
    }
  }).catch(err => {
    res.status(500).send('Internal server error');
  });
});

app.get('/listEmployees', function (req, res) {
  getAllEmployees().then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send(result);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.put('/addEmployee', function (req, res) {
  res.send('Hello World');
});

app.delete('/removeEmployee', function (req, res) {
  res.send('Hello World');
});

app.put('/assignEmployee', function (req, res) {
  res.send('Hello World');
});

app.get('/listMyReviews', function (req, res) {
  res.send('Hello World');
});

module.exports = app;