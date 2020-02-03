const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareObj = {};

(middlewareObj.checkCommentdOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    // Pegando o id pelo params, não esquecer que a rota está encurtada no app.js
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else {
        // depois que achou o id do comment no BD verificar se
        // o id do usuario em comments do banco é igual ao o
        // usuario que está logado, se sim o codigo continua
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You needto be logged in to do that");
    res.redirect("back");
  }
}),
  (middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCampground) => {
        // usando or para não deixar quebrar a aplicação
        //  se existir um erro ou não tiver um campground valido
        if (err || !foundCampground) {
          req.flash("error", "Campground not found");
          res.redirect("back");
        } else {
          //foundCampground.author.id.equals é um objeto
          // req.user.id é uma string, por isso nao podemos somente ===
          // temos que usar um metodo do mongoose para verificar se são iguais
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't permission to do that");
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
  }),
  (middlewareObj.isLoggedIn = function(req, res, next) {
    // se o usuario estiver autenticado entao proseguirá
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "VOCÊ PRECISA ESTAR LOGADO ");
    res.redirect("/login");
  });

module.exports = middlewareObj;
