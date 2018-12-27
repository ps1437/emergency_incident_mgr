var Incident = require("../models/incident.model");
// Show All Operation
module.exports.showDetails = (res, collectionName) => {
  collectionName
    .find({})
    .exec()
    .then(resObject => {
      res.json(resObject);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

// Upadte  Operation
module.exports.update = (res, collectionName, query, objectToUpdate) => {
  console.log("objectToUpdate: "+JSON.stringify(objectToUpdate));
  collectionName
    .updateOne(query, objectToUpdate)
    .exec()
    .then(resObject => {
      console.log(resObject);
      res.status(200).send({'status':true});
    })
    .catch(err => {
      console.log("error in update:" + err);
      res.json(err);
    });
};

// Show a single record Operation
module.exports.findById = (res, collectionName, parms) => {
  console.log(parms);
  collectionName
    .findOne(parms)
    .exec()
    .then(resObject => {
      console.log("res ***** :" + resObject);
      res.json(resObject);
    })
    .catch(err => {
      console.log("error express:" + err);
      res.json(err);
    });
};

// Delete a single record Operation
module.exports.delete = (res, collectionName, parms) => {
  console.log("parms :" + parms);

  collectionName
    .deleteOne(parms)
    .exec()
    .then(resObject => {
      res.json(resObject);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};
