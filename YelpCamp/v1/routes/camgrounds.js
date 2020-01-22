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
router.post("/", (req, res) => {
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

// New - show form to create new campground
router.get("/new", (req, res) => {
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

module.exports = router;
