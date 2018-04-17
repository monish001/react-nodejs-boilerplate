const CONSTANTS = require("./constants/common");
const express = require("express");
const userApi = require("./crud/users");
const userUtility = require("./utility/user");
const path = require("path");
// const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sassMiddleware = require("node-sass-middleware");
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const recordsRoutes = require("./routes/records");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const authz = require("express-authz");

/** 
 * Start: AuthN section 
 */
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new LocalStrategy(function (username, password, done) {
    userApi
      .findOne("UserName", username)
      .then(user => {
        if (userUtility.verifyPassword(user, password)) {
          delete user.Password; // This step is a must. Else encrypted password will be exposed.
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => done(err));
  })
);
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, JSON.stringify(user));
});
passport.deserializeUser(function (userStr, cb) {
  try {
    cb(null, JSON.parse(userStr));
  } catch (err) {
    return cb(err);
  }
});

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
/** 
 * End: AuthN section 
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);

// <domain>static/js/... should work from browser.
app.use(express.static(path.join(__dirname, "../client/build/")));

/** 
 * Start: AuthZ section 
 */
authz.addRule("allAccess", function () {
  return true;
});
authz.addRule("noAccess", function (req) {
  return false;
});
authz.addRule("admin", function (req) {
  return req.user.Role === CONSTANTS.ROLES_ADMIN;
});
authz.addRule("user manager", function (req) {
  return req.user.Role === CONSTANTS.ROLES_USER_MANAGER;
});
authz.addRule("regular user", function (req) {
  if (req.body.UserId && req.body.UserId !== req.user.Id) {
    return false; // if case req body contains user id of other user
  }
  return (
    req.user.Role === CONSTANTS.ROLES_REGULAR_USER &&
    req.params.userId === req.user.Id
  );
});

// authz.addPolicy(policyName, [roles]);
authz.addPolicy("allAccess", ["allAccess"]);
authz.addPolicy("crud user", ["admin"]);
authz.addPolicy("crud all records", ["admin", "user manager"]);
authz.addPolicy("crud records by self", ["regular user"]);
authz.addPolicy("nobody", ["noAccess"]);
/** 
 * End: AuthZ section 
 */

app.use("/", indexRoutes);
app.use(
  "/api/users/:userId/records", authz.enforcePolicy("crud records by self"),
  recordsRoutes
);
app.use("/api/records", authz.enforcePolicy("crud all records"), recordsRoutes);
app.use("/api/users", authz.enforcePolicy("crud user"), usersRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // TODO UI to served later.
  //
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;