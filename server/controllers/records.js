const HTTP_CODES = require("../constants/http-codes");
const express = require("express");
const router = express.Router();
const recordApi = require("../crud/records");
const debug = require('debug')('monish-gupta:server:controllers:records.js');
const validations = require('./validations/records');
const validate = require('express-validation');

/* GET all listing. */
router.get("/", validate(validations.get), (req, res, next) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const reqQuery = req.query;
  recordApi
    .get(reqQuery)
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

router.post("/", validate(validations.post), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  recordApi
    .post(reqBody)
    .then(() => {
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

router.put("/", validate(validations.put), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const reqQuery = req.query;
  debug('reqBody, reqParams, reqQuery');
  debug(reqBody, reqParams, reqQuery);
  recordApi
    .put(reqQuery, reqBody)
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

router.delete("/", validate(validations._delete), (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const reqQuery = req.query;
  debug('reqBody, reqParams, reqQuery');
  debug(reqBody, reqParams, reqQuery);
  recordApi
    .remove(reqQuery)
    .then(() => {
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
