app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
      return res.json({ token });
    })(req, res, next);
  });
  