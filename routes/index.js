var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`hello world ${process.env.test}`)
});

module.exports = router;
