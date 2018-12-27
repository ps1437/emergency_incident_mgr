var express = require('express');
var router = express.Router();
var mailService = require('../services/mail.service');
/* GET users listing. */
router.get('/mail', function (req, res, next) {
  mailService.sendmail();
  res.send('respond with a resource');
});

module.exports = router;
