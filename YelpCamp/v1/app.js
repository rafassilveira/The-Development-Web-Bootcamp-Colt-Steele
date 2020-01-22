const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seed");

// requiring routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/camgrounds");
const indexRoutes = require("./routes/index");

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-se1sy.mongodb.net/yelpcamp?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
    // mongoose.Promise = global.Promise;
  }
);
// fazer que o express sirva essa pasta,ou seja que esteja sempre disponivel
app.use(express.static(__dirname + "/public"));

// Para que o express entenda o bovy-parser
app.use(bodyParser.urlencoded({ extended: true }));
// Dizendo para express que arquivos ejs não precisar digitar a extensão ejs
app.set("view engine", "ejs");
seedDB();

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Bulma is the best dog,sorry!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
//Use.authenticate está dentro de User model
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware para deixar disponiel o currentUser em todas as rotas

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// colocando prefixo nas rotas
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(3000, () => {
  console.log("rodando");
});
