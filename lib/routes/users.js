const { Router } = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = Router()
  .get('/popular', (req, res, next) => {
    Comment
      .findTotalCommentsOnUsersPosts()
      .then(users => res.send(users))
      .catch(next);
  })  

  .get('/prolific', (req, res, next) => {
    User
      .prolificUser()
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/leader', (req, res, next) => {
    Comment
      .leader()
      .then(comments => res.send(comments))
      .catch(next);
  })

  .get('/impact', (req, res, next) => {
    Comment
      .impactUsers()
      .then(users => res.send(users))
      .catch(next);
  });
