const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  checkLogin,
  getAllEmployees,
  addUser,
  updateUser,
  changeUserStatus,
  getEmpOnly,
  addReviewer,
  listEmpReviews,
  updateFeedback,
  getMyReview,
} = require('./actions');

app.use('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * This file include the all API routes
 */

app.post('/checkLogin', function (req, res) {
  checkLogin(req.body.username, req.body.password).then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      const response = {
        id: result[0].id,
        userName: result[0].username,
        userType: result[0].user_type,
      };
      res.status(200).send({
        success: true,
        data: response,
      });
    }
  }).catch(err => {
    res.status(500).send('Internal server error');
  });
});

app.post('/listEmployees', function (req, res) {
  getAllEmployees().then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send({
        success: true,
        data: result,
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.post('/listEmployeesOnly', function (req, res) {
  getEmpOnly().then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send({
        success: true,
        data: result,
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.put('/addUser', function (req, res) {
  addUser(req.body.username, req.body.password, req.body.userType).then(result => {
    res.status(200).send({
      success: true,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.put('/updateUser', function (req, res) {
  updateUser(
    req.body.userId,
    req.body.username, 
    req.body.password, 
    req.body.userType,
  ).then(result => {
    res.status(200).send({
      success: true,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.delete('/removeUser', function (req, res) {
  changeUserStatus(
    req.body.userId,
  ).then(result => {
    res.status(200).send({
      success: true,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.put('/assignEmployeeReview', function (req, res) {
  addReviewer(req.body.reviewer, req.body.receiver).then(result => {
    res.status(200).send({
      success: true,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.post('/listEmpReviews', function (req, res) {
  listEmpReviews().then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send({
        success: true,
        data: result,
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.put('/updateReview', function (req, res) {
  updateFeedback(
    req.body.feedback,
    req.body.feedbackId, 
    req.body.byAdmin, 
    req.body.adminId,
  ).then(result => {
    res.status(200).send({
      success: true,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

app.post('/getMyReviews', function (req, res) {
  getMyReview(
    req.body.reviewer,
    req.body.id,
  ).then(result => {
    if(result.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send({
        success: true,
        data: result,
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal server error');
  });
});

module.exports = app;