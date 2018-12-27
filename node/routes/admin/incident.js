const express = require("express");
const router = express.Router();
const service = require("../../services/incident.service");
const incident_schema = require("../../models/incident.model");
const securityUser = require("../../middleware/securtyUser");

let data = [];


router.get("/", function (req, res) {
  incident_schema
    .find().select("-__v")
    .exec()
    .then(resObject => {
      this.data = resObject;//_.pluck(resObject,['incident_no','incident_type','incident_desc','contact_no','incident_status','incident_owner','incident_created_date','incident_location','incident_raised_by','']);

      console.log("--------------------------------" + this.data);
      res.json(resObject);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.get("/download/excel", function (req, res) {

  res.xls("data.xlsx", JSON.parse(this.data));
});

router.get("/:incident_no", function (req, res) {
  incident_schema
    .findOne({ incident_no: req.params.incident_no })
    .then(incident => {
      res.json(incident);
    })
    .catch(err => {
      console.log("errr :" + err);
      throw err;
    });
});

router.post("/create", function (req, res) {
  incident_schema
    .find()
    .select({ incident_no: 1, _id: 0 })
    .sort({ incident_no: -1 })
    .limit(1)
    .exec()
    .then(incident => {
      if (incident != "") {
        req.body.incident_no = parseInt(incident[0].incident_no) + 1;
      } else req.body.incident_no = 1;

      incident_schema.create(req.body, function (err, incident) {
        if (err) {
          console.log("errorrrr in express :" + err);
          res.send(err);
        } else {
          console.log("response in create express :" + incident);
          res.json(incident);
        }
      });
    })
    .catch(err => {
      console.log("errr :" + err);
      throw err;
    });
});

router.put("/update", [securityUser], function (req, res) {
  let updateIncident = req.body;
  let objectToUpdate = {
    $set: {
      incident_status: updateIncident.incident_status,
      incident_desc: updateIncident.incident_desc,
      incident_modified_date: Date.now()
    }
  };
  let query = { incident_no: updateIncident.incident_no };
  console.log("updating.............................");
  service.update(res, incident_schema, query, objectToUpdate);
});

module.exports = router;
