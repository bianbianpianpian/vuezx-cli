"use strict";

const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { resultData } = require("../../common/utils");

router.get("/download", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData);

  res.send(ret);
});

router.post('/upload', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: null
  });

  res.send(ret);
});

module.exports = router;
