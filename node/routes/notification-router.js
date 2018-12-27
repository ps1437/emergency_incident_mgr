const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
/* GET users listing. */
router.get("/view", function(req, res, next) {
  Notification.find({})
    .exec()
    .then(resObject => {
      res.json(resObject);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.post("/create", function(req, res) {
  console.log("here")
  Notification.create(req.body, function(err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // res.status(200).send({ token });
      // res.header("x-auth-token", token).send(
      res.status(200).send({
          message: "Notification created successfully..",
          status :true
        // token: token
      });
    }

  });
});

module.exports = router;
