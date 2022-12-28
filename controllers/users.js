const express = require("express");
const Register = require('../models/register.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser.js");


router.get(
  "/", fetchuser ,
  //validating input got by server, if input is in correct format, then user is created.
  //if any error is there, the return bas request and all the errrors.
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try {
      // checking if user with same email already exists or not
      const userId = req.body.userId
      console.log(userId)
      let user = await Register.find({_id : userId});

      if (!user) {
        return res
          .status(400)
          .json({success:false, error: "No User with this ID" });
      }

      const details = {
          "UserName" : user[0].name,
          "followers" : user[0].followers,
          "followings" : user[0].followings
      }
     
      res.status(200).json({success: true, details})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

module.exports = router;