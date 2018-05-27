const HTTP_CODES = require("../constants/http-codes");
const express = require("express");
const router = express.Router();
const userApi = require("../crud/users");
const debug = require('debug')('monish-gupta:server:controllers:users.js');
const validations = require('./validations/users');
const validate = require('express-validation');

/* GET all listing. */
router.get("/", validate(validations.get), (req, res, next) => {
  userApi
    .get()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      debug("ERROR", err.message, err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

/**
 * Create user should not be exposed. Check /register route instead.
 */
// router.post("/", validate(validations.post), (req, res) => {
//   const reqBody = req.body;
//   const reqParams = req.params;
//   userApi
//     .post(reqBody)
//     .then(() => {
//       res.json();
//     })
//     .catch(err => {
//       debug("ERROR", err.message, err);
//       res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
//         error: true,
//         details: err
//       });
//     });
// });

router.get("/:userId", validate(validations.get), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  userApi
    .get({'Id': reqParams.userId})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      debug("ERROR", err.message, err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

router.put("/:userId", validate(validations.put), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  userApi
    .put(reqParams.userId, reqBody)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      debug("ERROR", err.message, err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

router.delete("/:userId", validate(validations._delete), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  userApi
    .remove(reqParams.userId)
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
