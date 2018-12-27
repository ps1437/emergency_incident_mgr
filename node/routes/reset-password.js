const express = require("express");
const router = express.Router();
const auth_schema = require("../models/auth.model");
const mailServer = require("../services/mail.service");
const passwordHash = require("password-hash");

router.post("/updatePassword", function(req, res) {
  const { userPwd, resetToken, user_id
   } = req.body;

  if (resetToken) {
    const hashPwd = passwordHash.generate(userPwd);
    const updateObject = {
      $set: {
        password: hashPwd
      }
    };
    
    const query = { user_id: user_id };

    auth_schema
      .updateOne(query, updateObject)
      .exec()
      .then(result => {
        console.log(" sda" + result);
        return res
          .status(200)
          .send({ auth: true, message: "Password change successfully !!" });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).send({
          auth: false,
          message: "Password Token expired ,Please try again"
        });
    
      });
  } else {
    res.status(400).send({
      auth: false,
      message: "Password Token expired ,Please try again"
    });
  }
});

router.post("/reset", function(req, res) {
  const userId = req.body.userId;
//  console.log("rest " + userId);
  auth_schema
    .findOne({ user_id: userId })
    .exec()
    .then(user => {
      if (user) {
        const tokenReset = Math.floor(Math.random() * Math.floor(100000));
        const mailId = user.user_id;
        const userName = user.firstName;
        const msg =
          " Please use the below token to reset your password !\n\n\n\n Token : " +
          tokenReset;
        const subject = " Reset Password";
        mailServer.sendMail(mailId, userName, msg, subject);
        return res.status(200).send({
          token: tokenReset,
          auth: true,
          message: " Reset Password token sent to your registered email address"
        });
      } else {
        return res.json({
          auth: false,
          message: "Invalid User Id, Please try again !!"
        });
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

module.exports = router;
