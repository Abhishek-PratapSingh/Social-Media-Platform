const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const register = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true ,minlength: 6 },
  followers : { type: Number,  default:0 } ,
  followings : {type: Number,  default:0}  
  }, {
  timestamps: true,
});

const Register = mongoose.model('Register', register);

module.exports = Register;