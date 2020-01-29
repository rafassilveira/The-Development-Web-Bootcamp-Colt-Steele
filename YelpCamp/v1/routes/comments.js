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
// Comment edit route
router.get("/:comment_id/edit", checkCommentdOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    console.log(foundComment);
    if (err) {
      res.redirect("back");
    } else {
      // Como o req.params.id se refere ao campground, então podemos
      // dar uma nome e enviar para o template ao renderiza-lo
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});
// Comment update route

/* Ficará parecido com o put do campgrounds,
 porém alguns dados são diferentes, 
 como o array, o id do params e do doby*/

router.put("/:comment_id/", checkCommentdOwnership, (req, res) => {
  //esse comment_id é o mesmo da rota escrito acima ,
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, commentUpdated) => {
      if (err) {
        console.log(err);
      } else {
        // lembrar que esse req.params.id se refere-se ao camp
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});

// Destroy route
router.delete("/:comment_id/", checkCommentdOwnership, (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
//middleware
function isLoggedIn(req, res, next) {
  // se o usuario estiver autenticado entao proseguirá
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCommentdOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        //foundCampground.author.id.equals é um objeto
        // req.user.id é uma string, por isso nao podemos somente ===
        // temos que usar um metodo do mongoose para verificar se são iguais
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}


module.exports = router;
