const router = require('express').Router();
const passport = require('passport');

// logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
