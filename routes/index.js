// File to be reviewed
const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const userApi = require("../crud/users");

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

router.post(
  "/login", // TODO prefix /api/
  function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(403).send();
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

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/register", (req, res) => {
  const reqBody = req.body; // { username: 'monish006', password: 'qwerty6', 'c-password': 'qwerty6' }
  userApi
    .post(reqBody)
    .then(() => {
      res.json("Registration successful");
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

module.exports = router;
