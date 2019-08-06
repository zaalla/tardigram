
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password,
      profilePhotoUrl
    } = req.body;

    User  
      .create({ username, password, profilePhotoUrl })
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {
      username,
      password
    } = req.body;

    User  
      .findOne({ username })
      .then(user => {
        const isValidPasssword = user.compare(password);
        if(isValidPasssword) {
          res.cookie('session', user.authToken(), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          });
          res.send(user);
        } else {
          const err = new Error('invalid email/password');
          err.status = 401;
          next(err);
        }
      });
  })
  
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
