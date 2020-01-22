const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
	  id:{
		  type:mongoose.Schema.ObjectId,
		  ref:'User'
	  }
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
