const express = require("express");
const Post = require('../models/post.model.js')
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
     
      const userId = req.user.id
      console.log(userId)
    //   console.log("hey")
      let posts = await Post.find({userId : userId}).sort({createdAt: 'descending'});

      if (!posts) {
        return res
          .status(400)
          .json({success:false, error: "Sorry, No Post available" });
      }
      
      res.status(200).json({success: true, posts: posts})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

module.exports = router;