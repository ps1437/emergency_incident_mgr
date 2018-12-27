const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const auth_schema = require("../models/auth.model");
const auth = require("../middleware/authToken");

// db.createCollection("esim_user", function(err, res) {
//           if (err) throw err;
//          console.log("Collection created!");
//           db.close();
//       });

// const datetime = new Date();
// const formattedDate = dateFormat(datetime, "yyyy-mm-dd hh:MM:ss");

router.post("/signup", function(req, res) {
  auth_schema
    .findOne({ user_id: req.body.user_id })
    .exec()
    .then(user => {
      console.log(user);
      if (!user) {
        let pwd = req.body.password;
        req.body.password = passwordHash.generate(pwd);

        console.log('-------'+ req.body);
        auth_schema.create(req.body, function(err, user) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            res.status(200).send({
              auth: true,
              message: "You are successfully registered"
            });
          }
        });
      } else {
        res.send({ auth: false, message: "Email id already exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(400)
        .send({ auth: false, message: "Please check the filled details" });
    });
});

router.post("/social", function(req, res) {
  try {
    if (req.body.token) {
      const user = req.body;
      let payload = {
        user_id: req.body.email,
        userType: "N",
        userName: user.name
      };
      let token = jwt.sign(payload, "jwtPrivateKey", { expiresIn: "1h" });
      res
        .header("x-auth-token", token)
        .status(200)
        .send({
          auth: true,
          message: "Login successful",
          userName: user.name,
          userType: "Social",
          token: token,
          expiresIn: 3600
        });
    } else {
      return res.json({
        auth: false,
        message: "Failed to login , Please try again !!"
      });
    }
  } catch (err) {
    console.log(err);
    //throw err;
  }
});

router.post("/login", function(req, res) {
  let userId = req.body.user_id;
  console.log("userId :" + userId);
  auth_schema
    .findOne({ user_id: userId })
    .exec()
    .then(user => {
      if (!user) {
        console.log("user Not found");
        return res.json({
          auth: false,
          message: "User Id not exist !!"
        });
      } else if (user) {
        if (passwordHash.verify(req.body.password, user.password)) {
          console.log("Valid User.................");
          let payload = {
            user_id: req.body.user_id,
            userType: user.userType,
            userName: user.firstName
          };
          let token = jwt.sign(payload, "jwtPrivateKey", { expiresIn: "1h" });
          console.log("token :::::::: " + token);
          res
            .header("x-auth-token", token)
            .status(200)
            .send({
              auth: true,
              message: "Login sucessfull",
              userName: user.firstName,
              userType: user.userType,
              token: token,
              expiresIn: 3600
            });
        } else {
          console.log("faield");
          return res.json({
            auth: false,
            message: "Invalid User Id or Password , Please try again !!"
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});


router.get("/profile/:id", [auth], function(req, res) {
  auth_schema
    .findOne({ user_id: req.params.id })
    .exec()
    .then(users => {
      console.log("users :" + users);
      if (users) res.status(201).json(users);
      else res.json("error");
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/profile/update", [auth], function(req, res) {
  console.log("updating users.............."+ JSON.stringify(req.body));
  auth_schema
    .findOneAndUpdate({ user_id: req.body.user_id },req.body)
    .exec()
    .then(users => {
      console.log("upadtes :" +users );
      if (!users) 
      res.status(400).json(err);
      else
      res.status(201).json({'status':true});
       
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});



module.exports = router;
