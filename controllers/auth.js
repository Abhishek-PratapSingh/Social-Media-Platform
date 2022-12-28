require('dotenv').config()
const express = require('express')
const Register = require('../models/register.model.js')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { ValidatorsImpl } = require('express-validator/src/chain')
const res = require('express/lib/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const { findOne } = require("../models/register.model.js");
const fetchuser = require('../middleware/Fetchuser')
const JWT_SECRET = process.env.JWT_SECRET
// const JWT_SECRET = "random123"
// ROUTE 1: creating a user using POST : "/api/auth/createuser"
// No LOGIN required
router.post(
  '/register',
  [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be of minimum 6 characters').isLength({
      min: 6,
    }),
  ],
  //validating input got by server, if input is in correct format, then user is created.
  //if any error is there   , the return bas request and all the errrors.
  async (req, res) => {
    let success = false
    // console.log(JWT_SECRET)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    try {
      // checking if user with same email already exists or not
      let user = await Register.findOne({ email: req.body.email })
      if (user) {
        return res
          .status(400)
          .json({
            success: false,
            error: 'Sorry, user already exist with this email',
          })
      }
      // if user is aleardy not exist, then create  a new user
      const salt = await bcrypt.genSalt(10)

      const secpass = await bcrypt.hash(req.body.password, salt)
      user = await Register.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      })
      const data = {
        user: {
          // id: user.id,
          name: user.name,
        },
      }
      const authtoken = jwt.sign(data, JWT_SECRET)

     // console.log(authtoken)
      // res.json({ status: "created" });
      
      // const details = Register.find({email : req.body.email})
      // console.log(details.id)
      // const userDash = await User.create({
      //   userId : details.id ,
      //   name : details.name
      // })


      res.json({ success: true , msg: "Registered Successfully"})
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error!!!')
    }
  },
)

// ROUTE 2: Logging in  a user using POST : "/api/auth/login"
// No LOGIN required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be blanked.').exists(),
  ],
  //validating input got by server, if input is in correct format, then user is created.
  //if any error is there, the return bas request and all the errrors.
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let success = false
    const { email, password } = req.body
    try {
      let user = await Register.findOne({ email: email })
      if (!user) {
        return res
          .status(400)
          .json({ error: 'please, try to login with correct credentials' })
      }
      const password_compare = await bcrypt.compare(password, user.password)
      if (!password_compare) {
        return res.status(400).json({
          success: false,
          error: 'please, try to login with correct credentials',
        })
      }
      const data = {
        user: {
          id: user.id,
          email: user.email,
        },
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      success = true
      res.status(200).send({ success, token: authtoken })
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error!!!')
    }
  },
)


module.exports = router