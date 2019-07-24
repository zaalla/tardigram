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
  }); 
