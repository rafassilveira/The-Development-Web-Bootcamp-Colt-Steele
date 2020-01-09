const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/references", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});
const Post = require("./models/post");
const User = require("./models/user");

// User.create({
//   email: "bulma@rafael.com",
//   name: "Bulma"
// });

Post.create(
  {
    title: "3",
    content: "teste teste testdsadsadsae"
  },
  (err, post) => {
    User.findOne({ email: "bulma@rafael.com" }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        //foundUser:Usuario encotrado vom o findOne
        // posts:Propriedade do userSchema
        // push:metodo array para inserir no final o post
        // (post):post criado com o Post.create
        foundUser.posts.push(post);
        //salva alterações
        foundUser.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
);

// find user
//find all posts for that user
//depois de incluir os posts no user,
// mostrar todos os posts

// User.findOne({ email: "bulma@rafael.com" })
//   .populate("posts")
//   .exec((err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });
