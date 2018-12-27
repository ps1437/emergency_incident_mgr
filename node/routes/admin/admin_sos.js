const express = require("express");
const router = express.Router();
const service = require("../../services/admin.service");
const sos_schema = require("../../models/sos.model");
const admin = require("../../middleware/checkAdmin");
const auth_schema = require("../../models/auth.model");

router.get("/sos/", function (req, res) {
  return service.showDetails(res, sos_schema);
});



router.get("/sos/:id", [admin], function (req, res) {
  console.log(req.params.id);
  const params = { sos_id: req.params.id };
  return service.findByID(res, sos_schema, params);
});

router.post("/sos/create", [admin], function (req, res) {
  let sosModel = req.body;

  const id = Math.floor(Math.random() * Math.floor(1000));
  sosModel.sos_id = sosModel.sos_name + "_" + id;

  sos_schema.create(sosModel, function (err, user) {

    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.status(200).send({
        message: "Service is successfully created with Service Id :" + sosModel.sos_id
      });
    }
  })

});

router.put("/sos/update", [admin], function (req, res) {
  var objectToUpdate = req.body;
  console.log("updated Object +" + JSON.stringify(objectToUpdate));
  const updateObject = {
    $set: {
      sos_name: objectToUpdate.sos_name,
      sos_desc: objectToUpdate.sos_desc,
      sos_owner: objectToUpdate.sos_owner
    }
  };
  const query = { sos_id: objectToUpdate.sos_id };
  return service.update(res, sos_schema, query, updateObject);
});

router.delete("/sos/delete/:id", [admin], function (req, res) {
  const params = { sos_id: req.params.id };
  return service.delete(res, sos_schema, params);
});



router.get("/users", [admin], function (req, res) {
  auth_schema.find({})

    .select('-password -__v -_id -createdDate').exec()
    .then((resObject) => {
      res.json(resObject);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    })
});


router.post("/user/update", [admin], function (req, res) {
  var objectToUpdate = req.body;
  const updateObject = {
    $set: {
      userType: objectToUpdate.userType,
    }
  };
  const query = { user_id: objectToUpdate.user_id };
  return service.update(res, auth_schema, query, updateObject);

});

module.exports = router;
