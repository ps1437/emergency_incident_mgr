var express = require('express');
var router = express.Router();
var service = require('../../services/report.service');
var incident_schema = require('../../models/incident.model');

router.get('/', function (req, res) {
    return service.reportbyIncident(res, incident_schema)

});


router.post('/gen', function (req, res) {

    return service.generateReport(req, res, incident_schema);

    const month = +req.body.month;
  
    if (month < 1) {
        return service.reportbyIncident(req, res, incident_schema)
    } else {
        return service.generateReport(req, res, incident_schema)
    }




});

module.exports = router;