const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our db
    User.findOne({ 'google.id' : profile.id }).then((currentUser) => {
      if(currentUser) {
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          google: {
            id: profile.id,
            name: profile.displayName
          }
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }

    });
  })
);
