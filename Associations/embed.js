const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/association", {
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

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//   email: "rafael2@rafael.com",
//   name: "rafael silveira2"
// });

// newUser.posts.push({
//   title: "javascrip",
//   content: "es6"
// });

// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
// const newPost = new Post({
//   title: "Donuts",
//   content: "are delicious"
// });

// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });
User.findOne({ name: "rafael silveira" }, (err, user) => {
  if (err) {
    // console.log(err);
  } else {
    user.posts.push({
      title: "Coffee",
      content: "are the best"
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
