const express = require("express");
// When true any req.params passed to the router will be merged into the router's req.params.
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

// Comments Create
// add isLoggedI tbm na post para que o usuario não tenha
// acesso ao formulario dos comentários
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // add id and username to comment
          // armazenando o id do usuario logado no models do comments author
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //salvando no banco de dados
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

router.get('/:comment_id/edit',(req,res)=>{
	res.render('comments/edit')	
})
//middleware
function isLoggedIn(req, res, next) {
  // se o usuario estiver autenticado entao proseguirá
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
