const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

// Login Route
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Create JWT payload
            const payload = {
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            };

            // Sign token
            jwt.sign(
              payload,
              jwtSecret,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
    })
    .catch(err => console.error(err));
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
    res.status(400).json({ errors });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.status(400).json({ errors });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.error(err));
            });
          });
        }
      })
      .catch(err => console.error(err));
  }
});

// Current User Route
router.get('/current_user', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
