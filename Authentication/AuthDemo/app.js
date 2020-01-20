const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-se1sy.mongodb.net/AuthDemo?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
    // mongoose.Promise = global.Promise;
  }
);
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Bula the best dog",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);

//ROUTES:

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/secret", (req, res) => {
  res.render("secret");
});

//AUTH ROUTES

app.get("/register", (req, res) => {
  res.render("register");
});

//handling user sign up
app.post("/register", (req, res) => {
  req.body.username;
  req.body.password;
  //We having passing password as second paramenter, because we'll hashing
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
    }
  );
});

app.get("/login", (req, res) => {
  res.render("login");
});

//login logic
app.post(
  "/login",
  //middleware
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

app.listen(3333);
