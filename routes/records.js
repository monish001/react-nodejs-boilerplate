const HTTP_CODES = require("../constants/http-codes");
const express = require("express");
const router = express.Router();
const recordApi = require("../crud/records");

/* GET all listing. */
router.get("/", (req, res, next) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const reqQuery = req.query;
  recordApi
    .get(reqQuery)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

router.post("/", (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  recordApi
    .post(reqBody)
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

router.put("/", (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const reqQuery = req.query;
  recordApi
    .put(reqQuery, reqBody)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

router.delete("/", (req, res) => {
  const reqBody = req.body;
  const reqParams = req.params;
  recordApi
    .remove(reqBody)
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
        error: true,
        details: err
      });
    });
});

module.exports = router;
