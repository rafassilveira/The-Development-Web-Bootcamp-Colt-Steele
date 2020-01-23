const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.ObjectId,
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
