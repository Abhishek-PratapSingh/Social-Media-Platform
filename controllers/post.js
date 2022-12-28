const express = require("express");
const Post = require('../models/post.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser");

router.post(
  "/",
  fetchuser,
  [],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const {title , description} = req.body ;
     //const loginId = req.user.email;
     const userId = req.user.id;
     console.log(userId)

  
      let newPost = await Post.create({
        userId,
        title,
        description,
      });
   
   
   
      res.json({success:true , newPost: newPost});
    
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);


// router.get(
//   "/:id",
//   fetchuser,
//   [],
 
//   async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({success:false, errors: errors.array() });
//     }
//     try { 
     
     
//      const postId = req.params.id;
//      console.log(postId)

//      const post = await Post.findById(postId)

//       res.json({success:true , post});
//     // res.json({success:true})
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Internal Server Error!!!");
//     }
//   }
// );

router.delete(
  "/:id",
  fetchuser,
  [],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const postId = req.params.id;
     const userId= req.user.id
    //  console.log(postId) 
     const post = await Post.findOne({_id : postId , userdId : userId });
     if(!post){
        msg = " No Such post available"
        res.status(500).json({msg})
        return 
     }
     
     post.delete(err=>{
      return err
     })

     res.json({success:true , msg : "post deleted successfully" });
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

router.get(
  "/:id",
  fetchuser,
  [],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const postId = req.params.id;
    //  console.log(postId) 
     const post = await Post.findOne({_id : postId});
     if(!post){
        msg = " No Such post available"
        res.status(500).json({msg})
        return 
     }
     console.log(post)

     const obj = {
        likes : post.likes,
        comments : post.comments
     } 

     res.json({success:true , post : obj });
    
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);


module.exports = router;