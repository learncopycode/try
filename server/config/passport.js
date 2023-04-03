const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
  
          const isMatch = await bcrypt.compare(password, user.password);
  
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
  
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload.id);
  
          if (!user) {
            return done(null, false);
          }
  
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  