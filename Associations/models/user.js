const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/references", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
