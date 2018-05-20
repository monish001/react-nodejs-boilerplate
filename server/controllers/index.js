// File to be reviewed
const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const userApi = require("../crud/users");
const debug = require('debug')('monish-gupta:server:controllers:index.js');
const HTTP_CODES = require("../constants/http-codes");

/* GET home page. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  res.render("index", { title: "Jogger App" });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Jogger App" });
});

router.get("/profile", ensureLoggedIn(), (req, res) => {
  res.render("profile", { title: "Jogger App", user: req.user });
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get("/api/logout", function(req, res) {
  req.logout();
  res.json();
});

router.post(
  "/api/login",
  function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(HTTP_CODES.FORBIDDEN).send();
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  }
);

/**
 * TODO: throw error if username already taken.
 */
router.post("/api/register", (req, res) => {
  const reqBody = req.body; // { username: 'monish006', password: 'qwerty6', 'c-password': 'qwerty6' }
  userApi
    .post(reqBody)
    .then((data) => {
      res.json();
    })
    .catch(err => {
      debug("ERROR", err.message, err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

module.exports = router;
