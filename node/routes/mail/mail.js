const express = require("express");
const router = express.Router();
const service = require("../../services/mail.service");
//const incident_schema = require("../../models/incident.model");
//const securityUser = require('../../middleware/securtyUser');

router.post("/send", function (req, res) {

  
  service.sendMail(
    req.body.sos_emailId,
    "ADMIN",
    req.body.mailBody,
    "Mail From Emergency Tracker Project"
  );
  return res.status(200).send({
    message: " Email sent to registered email address"
  });
  console.log("-------mail service stopped-----------");
});

module.exports = router;
