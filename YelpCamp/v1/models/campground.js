const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  createdAt:{type:Date,default:Date.now},	
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      //associando o id do comments com o do campground
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
