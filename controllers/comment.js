const express = require("express");
const Post = require('../models/post.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser.js");
var uniqid = require('uniqid'); 

router.post(
  "/:id", fetchuser ,
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
    //   console.log(req.params)
      const id=req.params.id
      const userId = req.user.id;
      const mycomment=req.body.comment
    //   console.log(req.params)
    //   console.log("hey")
      let post = await Post.find({_id : id});
    //   let myself=await Register.find({_id : myId});
      if (!post) {
        return res
          .status(400)
          .json({success:false, error: "Sorry, No Post with this id" });
      }
      
      console.log(post[0].comments)
    //   commentId = uniqid();
      
    //   post[0].comments = []
    //   console.log(mycomment)
      post[0].comments.push(mycomment)
      post[0].save(err=>{
        return err;
      }) 

      res.status(200).json({success: true , commentId : userId })
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

  
module.exports = router;