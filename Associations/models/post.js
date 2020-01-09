const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/references", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
Post = mongoose.model("Post", postSchema);

module.exports = Post;
