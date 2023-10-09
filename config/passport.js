const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./db.js');

passport.use(new LocalStrategy(
  {
    usernameField: 'phone',
  },
  async (username, password, cb) => {
    const getUserInfo = 'SELECT * FROM Executive WHERE phone=?;';
    const userInfo = await db.query(getUserInfo, [username]);
    if (userInfo[0][0].password === password) {
      console.log('login successed');
      return cb(null, userInfo[0][0]);
    } else {
      console.log('login failed');
      return cb(null, false, { message: "Incorrect username or password." });
    }
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick( function() {
    cb(null, { id: user.phone, username: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;