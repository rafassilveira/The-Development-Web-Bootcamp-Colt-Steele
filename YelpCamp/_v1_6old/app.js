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

// rota inicial, rederiza o landing.ejs
app.get("/", (req, res) => {
  res.render("landing");
});

// INDEX - SHOW ALL DE CAMPGROUDNS
app.get("/campgrounds/", (req, res) => {
  //mostrando todos os campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE-ADD TO CAMPGROUND TO DB
app.post("/campgrounds/", (req, res) => {
  // pegando o name do formulario e armazenando na variavel name
  var name = req.body.name;
  // pegando a url da imagem do formulario e armazenando na variavel imagem
  var image = req.body.image;
  var desc = req.body.description;

  // armazenando em uma nova variavel como objeto contendo o nome ,imagem e desc anteriormente armazenado
  var newCampground = { name: name, image: image, description: desc };
  // Create a new campground adn save to DB
  Campground.create(newCampground, (err, newcreated) => {
    if (err) {
      console.log(err);
    } else {
      // depois de enviar redireciona para a pagina campgrounds
      res.redirect("/campgrounds/");
    }
  });
});

// NEW - FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

//SHOW show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  // params:dado da url
  // foundCampground:campground que encontrou;
  // Usando o populate para add o comments
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);

        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//----- Comments Route ---------\\

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

// add isLoggedI tbm na post para que o usuario não tenha
// acesso ao formulario dos comentários
app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//AUTH ROUTES
app.get("/register", (req, res) => {
  res.render("register");
});

//handling sign up logic
app.post("/register", (req, res) => {
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

//Login routes

app.get("/login", (req, res) => {
  res.render("login");
});

//handling login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//lougout

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  // se o usuario estiver autenticado entao proseguirá
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, () => {
  console.log("rodando");
});
