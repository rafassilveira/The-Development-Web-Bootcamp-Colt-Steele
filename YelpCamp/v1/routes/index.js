const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Root Route
router.get("/", (req, res) => {
  res.render("landing");
});

// show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//handling sign up logic
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  //resgister recebe 2 parametros, segundo é a senha que será gerado o hash
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("campgrounds");
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  
  res.render("login");
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//lougout route

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "VOCÊ DESLOGOU ");
  res.redirect("/campgrounds");
});

module.exports = router;
