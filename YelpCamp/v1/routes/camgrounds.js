const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// index - show all the campground
router.get("/", (req, res) => {
  //mostrando todos os campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// Create - add to campgrpund to db
router.post("/", isLoggedIn, (req, res) => {
  // pegando o name do formulario e armazenando na variavel name
  var name = req.body.name;
  // pegando a url da imagem do formulario e armazenando na variavel imagem
  var image = req.body.image;
  var desc = req.body.description;
  // Criando um objeto author com a props de id e username, esses receberão os dados do usuário que está logado
  const author = {
    id: req.user._id,
    username: req.user.username
  };

  // armazenando em uma nova variavel como objeto contendo o nome ,imagem e desc anteriormente armazenado
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
  // Create a new campground adn save to DB
  Campground.create(newCampground, (err, newcreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newcreated);

      // depois de enviar redireciona para a pagina campgrounds
      res.redirect("/campgrounds/");
    }
  });
});

// New - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//SHOW show more info about one campground
router.get("/:id", (req, res) => {
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

// Edit campground route

router.get("/:id/edit", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

// Update campground route

router.put("/:id", function(req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    { new: true },
    function(err, updatedCampground) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        //redirect somewhere(show page)
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});

//Destroy route
router.delete("/:id", (req, res) => {
  Campground.findByIdAndDelete(req.params.id, err => {
    if (err) {
      console.log(err);
    }
	  res.redirect('/campgrounds')
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

module.exports = router;
