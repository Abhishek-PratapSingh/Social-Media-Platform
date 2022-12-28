const express = require("express");
const Register = require('../models/register.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser.js");


router.post(
  "/follow/:id", fetchuser ,
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
      const userId=req.params.id
      const myId=req.user.id
    //   console.log(req.params)
    //   console.log("hey")
      let user = await Register.find({_id : userId});
      let myself=await Register.find({_id : myId});
      if (!user) {
        return res
          .status(400)
          .json({success:false, error: "Sorry, No User with this id" });
      }
      
        
      user[0].followers+=1;
      myself[0].followings+=1;
      user[0].save(err=>{
        return err;
      }) 
      myself[0].save(err=>{
        return err;
      })

      res.status(200).json({success: true , user , myself})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);


router.post(
    "/unfollow/:id", fetchuser ,
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
        const userId=req.params.id
        const myId=req.user.id
      //   console.log(req.params)
      //   console.log("hey")
        let user = await Register.find({_id : userId});
        let myself=await Register.find({_id : myId});
        if (!user) {
          return res
            .status(400)
            .json({success:false, error: "Sorry, No User with this id" });
        }
        
          
        user[0].followers-=1;
        myself[0].followings-=1;
        user[0].save(err=>{
          return err
        }) 
        myself[0].save(err=>{
          return err
        })
  
        res.status(200).json({success: true , user , myself})
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error!!!");
      }
    }
  );
  

  
module.exports = router;