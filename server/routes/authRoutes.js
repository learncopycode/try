const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Load User model
const User = require('../models/User');

// Login Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Register Route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        newUser.save().then(user => {
          req.flash(
            'success_msg',
            'You are now registered and can log in'
          );
          res.redirect('/login');
        }).catch(err => console.log(err));
      }
    });
  }
});

module.exports = router;
