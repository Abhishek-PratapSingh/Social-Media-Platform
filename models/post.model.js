const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  userId: { type: String, required: true },
  title : { type : String, required: true},
  description: {type: String , required: true},
  likes: {type: Number , default: 0},
  comments : [ { type : String } ]
 },
  {
  timestamps: true,
});

const Post = mongoose.model('Post', post);

module.exports = Post;